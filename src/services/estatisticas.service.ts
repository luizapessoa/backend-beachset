import { prisma } from "../lib/prisma";

export const buscarEstatisticasAtleta = async (idAtleta: number) => {

    const atleta = await prisma.atleta.findUnique({
        where: {
            id_atleta: idAtleta
        }
    });

    if (!atleta) {
        throw new Error("Atleta não encontrado");
    }

    const participacoes = await prisma.composicaoDupla.findMany({
        where: {
            id_atleta: idAtleta
        },
        include: {
            dupla: {
                include: {
                    joga: {
                        include: {
                            partida: {
                                include: {
                                    resultado: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    let partidas = 0;
    let vitorias = 0;
    let derrotas = 0;

    for (const participacao of participacoes) {

        for (const jogo of participacao.dupla.joga) {

            partidas++;

            const resultados = jogo.partida.resultado;

            let setsDupla = 0;
            let setsAdversario = 0;

            for (const resultado of resultados) {

                if (resultado.pontos_dupla1 > resultado.pontos_dupla2) {
                    setsDupla++;
                } else if (resultado.pontos_dupla2 > resultado.pontos_dupla1) {
                    setsAdversario++;
                }
            }

            if (setsDupla > setsAdversario) {
                vitorias++;
            } else if (setsAdversario > setsDupla) {
                derrotas++;
            }
        }
    }

    return {
        partidas,
        vitorias,
        derrotas
    };
};