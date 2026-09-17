import { prisma } from "../lib/prisma";

export const criarPartida = async (
    dataHora: Date,
    tipoPartida: string | undefined,
    idComunidade: number,
    dupla1Id: number,
    dupla2Id: number
) => {

    const dupla1 = await prisma.dupla.findUnique({
        where: {
            id_dupla: dupla1Id
        }
    });

    const dupla2 = await prisma.dupla.findUnique({
        where: {
            id_dupla: dupla2Id
        }
    });

    if (!dupla1) {
        throw new Error("Dupla 1 não encontrada");
    }

    if (!dupla2) {
        throw new Error("Dupla 2 não encontrada");
    }

    if (dupla1Id === dupla2Id) {
        throw new Error("A partida deve ter duas duplas diferentes");
    }

    const comunidade = await prisma.comunidade.findUnique({
        where: {
            id_comunidade: idComunidade
        }
    });

    if (!comunidade) {
        throw new Error("Comunidade não encontrada");
    }

    const partida = await prisma.$transaction(async (tx) => {

        const novaPartida = await tx.partida.create({
            data: {
                dataHora,
                tipo_partida: tipoPartida ?? null,
                id_comunidade: idComunidade
            }
        });

        await tx.jogaPartida.createMany({
            data: [
                {
                    id_partida: novaPartida.id_partida,
                    id_dupla: dupla1Id
                },
                {
                    id_partida: novaPartida.id_partida,
                    id_dupla: dupla2Id
                }
            ]
        });

        return novaPartida;
    });

    return partida;
};