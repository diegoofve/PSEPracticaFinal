import { BuyTicketDto } from "../dtos/payment.dto";
import { prisma } from "../lib/db";
import { ConflictError, FatalError, ForbiddenError, NotFoundError, PaymentError } from "../lib/errors";
import axios from "axios"
import { logger } from "../lib/logger";

const client = axios.create({
    baseURL: process.env.API_BASE_URL !,
    timeout: 5000,
    headers: { 'Content-Type': 'application/json'}
});

const makePayment = async (clienteId: number, data: BuyTicketDto) => {
    const { abonoId, ...paymentData} = data

    const abono = await prisma.abono.findUnique({
        where: { id: data.abonoId }
    })

    if(!abono){
        throw new NotFoundError("Abono no encontrado.")
    }

    if(abono.stock <= 0){
        throw new ConflictError("No hay stock disponible para el abono.")
    }

    const festival = await prisma.festival.findUnique({
        where: { id: abono.festivalId }
    })

    if(!festival){
        throw new NotFoundError("No se ha encontrado el festival al que pertenece el abono.")
    }

    if(festival.fechaFin > new Date()){
        throw new ForbiddenError("No puedes comprar abonos para festivales que han acabado.")
    }

    const total = Number(abono.precio);

    const venta = await prisma.venta.create({
        data: {
            clienteId,
            total,
            estado: "PENDIENTE",
            ventasAbonos: {
                create: {
                    abonoId: abono.id,
                    cantidad: 1,
                    precioUnit: abono.precio
                }
            }
        },
        include: { ventasAbonos: true}
    })

    const authPago = await client.post("/auth/login", {
        username: process.env.API_AUTH_USER,
        password: process.env.API_AUTH_PASSWORD
    })

    const token = authPago.data.access_token

    let pagoAceptado = false
    try{
        const pago = await client.post("/payments/charge", {
                ...paymentData,
                amount: Number(abono.precio),
                currency: "EUR"
            },
            { headers: {Authorization: `Bearer ${token} `} }
        )
        pagoAceptado = pago.data.status === "approved"
    }catch(err){
        await prisma.venta.update({
            where: { id: venta.id },
            data: { estado: "CANCELADA" }
        })

        throw new PaymentError("No se ha podido procesar el pago.")
    }

    if(!pagoAceptado){
        await prisma.venta.update({
            where: { id: venta.id },
            data: { estado: "CANCELADA" }
        })

        throw new PaymentError("El pago no ha sido aceptado.")
    }

    try {
        await prisma.$transaction([
            prisma.venta.update({
                where: { id: venta.id },
                data: { estado: "PAGADA" }
            }),
            prisma.abono.update({
                where: { id: abono.id },
                data: { stock: abono.stock - 1 }
            })
        ])
    } catch (error) {
        throw new FatalError("El pago se realizó correctamente pero hubo un problema al procesar tu pedido. Por favor contacta con un administrador.")
    }

    return venta
} 

export const PaymentService = {
    makePayment
};