import { Strategy, ExtractJwt } from "passport-jwt";
import type { StrategyOptions } from "passport-jwt";
import { prisma } from "./db";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'mi_clave_super_secreta'
};

export const JWTStrategy = new Strategy(options, async (payload, done) => {

    try {
        if (payload.rol === "ADMIN") {
            return done(null, { rol: "ADMIN" })
        }

        if (payload.rol === "CLIENTE") {
            const cliente = await prisma.cliente.findFirst({
                where: { id: payload.id, fechaBaja: null }
            })
            if (!cliente) return done(null, false)
            return done(null, { ...cliente, rol: "CLIENTE" })
        }

        if (payload.rol === "EMPRESA") {
            const empresa = await prisma.empresa.findFirst({
                where: { id: payload.id, fechaBaja: null }
            })
            if (!empresa) return done(null, false)
            return done(null, { ...empresa, rol: "EMPRESA" })
        }

        return done(null, false)

    } catch (error) {
        return done(error, false)
    }
})