import type { LoginDto, RegisterClienteDto, RegisterEmpresaDto } from "../dtos/auth.dto"
import { prisma } from '../lib/db';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {  ConflictError, FatalError, GonePermanentlyError, UnauthorizedError } from "../lib/errors";

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_super_secreta"

const login = async (data: LoginDto): Promise<string> => {
    //comprobar primero si el ususario es el admin
    if (data.email === process.env.ADMIN_EMAIL) {
        const esAdmin = await bcrypt.compare(data.password, process.env.ADMIN_PASSWORD!)
        if (!esAdmin) throw new UnauthorizedError("Credenciales incorrectas.")
        return jwt.sign({ rol: "ADMIN" }, JWT_SECRET, { expiresIn: "8h" })
    }

   const registro = await prisma.registroEmail.findUnique({
        where: { email: data.email }
    })

    if (!registro){
        throw new UnauthorizedError("Credenciales incorrectas.");
    }

    if (registro.baneado){
        throw new GonePermanentlyError("Cuenta suspendida permanentemente.");
    }

    if (registro.tipo === "CLIENTE") {
        const cliente = await prisma.cliente.findFirst({
            where: { email: data.email, fechaBaja: null }
        })
        if (!cliente) throw new UnauthorizedError("Credenciales incorrectas.")

        const passwordCorrecta = await bcrypt.compare(data.password, cliente.password)
        if (!passwordCorrecta) throw new UnauthorizedError("Credenciales incorrectas.")

        return jwt.sign({ id: cliente.id, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "8h" })
    }

    if(registro.tipo == "EMPRESA"){
        const empresa = await prisma.empresa.findFirst({
            where: { email: data.email, fechaBaja: null }
        })
        if (!empresa) throw new UnauthorizedError("Credenciales incorrectas.")

        const passwordCorrecta = await bcrypt.compare(data.password, empresa.password)
        if (!passwordCorrecta) throw new UnauthorizedError("Credenciales incorrectas.")

        return jwt.sign({ id: empresa.id, rol: "EMPRESA", estado: empresa.estado }, JWT_SECRET, { expiresIn: "8h" })
    }

    throw new FatalError() //para que typescript no llore, siempre va a ser CLIENTE o EMPRESA
}

const registerCliente = async (data: RegisterClienteDto): Promise<void> => {
    const emailExiste = await prisma.registroEmail.findUnique({
        where: { email: data.email }
    })

    if (emailExiste){
        throw new ConflictError("El email ya está en uso.");
    }

    const dniExiste = await prisma.cliente.findFirst({
        where: { dni: data.dni, fechaBaja: null }
    })

    if (dniExiste){
        throw new ConflictError("El DNI ya está en uso.");
    }

    const hash = await bcrypt.hash(data.password, 10)

    await prisma.$transaction([
        prisma.registroEmail.create({
            data: { email: data.email, tipo: "CLIENTE" }
        }), 
        prisma.cliente.create({
            data: {
                email: data.email,
                password: hash,
                nombre: data.nombre,
                apellidos: data.apellidos,
                fechaNacimiento: data.fechaNacimiento,
                dni: data.dni,
                telefono: data.telefono
            }
        })
    ])
}

const registerEmpresa = async (data: RegisterEmpresaDto): Promise<void> => {
    const emailExiste = await prisma.registroEmail.findUnique({
        where: { email: data.email }
    })

    if (emailExiste){
        throw new ConflictError("El email ya está en uso.");
    }

    const cifExiste = await prisma.empresa.findFirst({
        where: { cif: data.cif, fechaBaja: null }
    })

    if (cifExiste){
        throw new ConflictError("El CIF ya está en uso.");
    }

    const hash = await bcrypt.hash(data.password, 10)

    await prisma.$transaction([
        prisma.registroEmail.create({
            data: { email: data.email, tipo: "EMPRESA" }
        }),
        prisma.empresa.create({
            data: {
                email: data.email,
                password: hash,
                razonSocial: data.razon,
                cif: data.cif,
                domicilioSocial: data.domicilio,
                nombreContacto: data.nombreContacto,
                telefonoContacto: data.telefono
            }
        })
    ])
}

export const AuthService = {
    login,
    registerCliente,
    registerEmpresa,
}