import type { LoginDto, RegisterClienteDto, RegisterEmpresaDto, UpdateClienteDto, UpdateEmpresaDto } from "../dtos/auth.dto"
import { prisma } from '../lib/db';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_super_secreta"

const login = async (data: LoginDto): Promise<string> => {
    //comprobar primero si el ususario es el admin
    if (data.email === process.env.ADMIN_EMAIL) {
        const esAdmin = await bcrypt.compare(data.password, process.env.ADMIN_PASSWORD!)
        if (!esAdmin) throw new Error("Credenciales incorrectas")
        return jwt.sign({ rol: "ADMIN" }, JWT_SECRET, { expiresIn: "8h" })
    }

   const registro = await prisma.registroEmail.findUnique({
        where: { email: data.email }
    })

    if (!registro){//TODO:err
        throw new Error("Credenciales incorrectas");
    }

    if (registro.baneado){//TODO:err
        throw new Error("Cuenta suspendida permanentemente");
    }

    if (registro.tipo === "CLIENTE") {
        const cliente = await prisma.cliente.findFirst({
            where: { email: data.email, fechaBaja: null }
        })
        if (!cliente) throw new Error("Credenciales incorrectas")//TODO:err

        const passwordCorrecta = await bcrypt.compare(data.password, cliente.password)
        if (!passwordCorrecta) throw new Error("Credenciales incorrectas")//TODO:err

        return jwt.sign({ id: cliente.id, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "8h" })
    }

    if(registro.tipo == "EMPRESA"){
        const empresa = await prisma.empresa.findFirst({
            where: { email: data.email, fechaBaja: null }
        })
        if (!empresa) throw new Error("Credenciales incorrectas")//TODO:err

        const passwordCorrecta = await bcrypt.compare(data.password, empresa.password)
        if (!passwordCorrecta) throw new Error("Credenciales incorrectas")//TODO:err

        return jwt.sign({ id: empresa.id, rol: "EMPRESA", estado: empresa.estado }, JWT_SECRET, { expiresIn: "8h" })
    }

    throw Error("") //para que typescript no llore, siempre va a ser CLIENTE o EMPRESA
}

const registerCliente = async (data: RegisterClienteDto): Promise<void> => {
    const emailExiste = await prisma.registroEmail.findUnique({
        where: { email: data.email }
    })

    if (emailExiste){
        throw new Error("El email ya está en uso");//TODO:err
    }

    const dniExiste = await prisma.cliente.findFirst({
        where: { dni: data.dni }
    })

    if (dniExiste){
        throw new Error("El DNI ya está en uso");//TODO:err
    }

    const hash = await bcrypt.hash(data.password, 10)

    await prisma.registroEmail.create({
        data: { email: data.email, tipo: "CLIENTE" }
    })

    await prisma.cliente.create({
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
}

const registerEmpresa = async (data: RegisterEmpresaDto): Promise<void> => {
    const emailExiste = await prisma.registroEmail.findUnique({
        where: { email: data.email }
    })

    if (emailExiste){
        throw new Error("El email ya está en uso");//TODO:err
    }

    const cifExiste = await prisma.empresa.findFirst({
        where: { cif: data.cif }
    })

    if (cifExiste){
        throw new Error("El CIF ya está en uso");//TODO:err
    }

    const hash = await bcrypt.hash(data.password, 10)

    await prisma.registroEmail.create({
        data: { email: data.email, tipo: "EMPRESA" }
    })

    await prisma.empresa.create({
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
}

const updateCliente = async (clienteId: number, data: UpdateClienteDto): Promise<void> => {
    const result = prisma.cliente.findUnique({
        where: {id: clienteId}
    })

    if(!result){
        throw new Error("cliente inexistente") //TODO:err
    }

    prisma.cliente.update({
        where: {id: clienteId},
        data: data
    })
}

const updateEmpresa = async (empresaId: number, data: UpdateEmpresaDto): Promise<void> => {
    const result = prisma.empresa.findUnique({
        where: {id: empresaId}
    })

    if(!result){
        throw new Error("empresa inexistente") //TODO:err
    }

    prisma.empresa.update({
        where: {id: empresaId},
        data: data
    })
}

const deleteCliente = async (clienteId: number): Promise<void> => {
    const result = prisma.cliente.findUnique({
        where: {id: clienteId}
    })

    if(!result){
        throw new Error("cliente inexistente") //TODO:err
    }

    prisma.cliente.delete({
        where: {id: clienteId}
    })
}

const deleteEmpresa = async (empresaId: number): Promise<void> => {
    const result = prisma.empresa.findUnique({
        where: {id: empresaId}
    })

    if(!result){
        throw new Error("empresa inexistente") //TODO:err
    }

    prisma.empresa.delete({
        where: {id: empresaId},
    })
}

export const AuthService = {
    login,
    registerCliente,
    registerEmpresa,
    updateCliente,
    updateEmpresa,
    deleteCliente,
    deleteEmpresa
}