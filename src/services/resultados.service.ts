import { prisma } from "../lib/prisma";

export const criarResultado = async (
    idPartida: number,
    numeroSet: number,
    pontosDupla1: number,
    pontosDupla2: number
) => {

    const partida = await prisma.partida.findUnique({
        where: {
            id_partida: idPartida
        }
    });

    if (!partida) {
        throw new Error("Partida não encontrada");
    }

    if (numeroSet < 1 || numeroSet > 3) {
        throw new Error("O número do set deve estar entre 1 e 3");
    }

    if (pontosDupla1 < 0 || pontosDupla2 < 0) {
        throw new Error("Os pontos não podem ser negativos");
    }

    if (pontosDupla1 === pontosDupla2) {
        throw new Error("O set não pode terminar empatado");
    }

    const resultado = await prisma.resultado.create({
        data: {
            id_partida: idPartida,
            numero_set: numeroSet,
            pontos_dupla1: pontosDupla1,
            pontos_dupla2: pontosDupla2
        }
    });

    return resultado;
};