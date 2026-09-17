import { Request, Response } from "express";
import { criarPartida as criarPartidaService } from "../services/partidas.service";

export const criarPartida = async (req: Request, res: Response) => {
    try {
        const {
            dataHora,
            tipo_partida,
            id_comunidade,
            dupla1Id,
            dupla2Id
        } = req.body;

        if (!dataHora || !id_comunidade || !dupla1Id || !dupla2Id) {
            return res.status(400).json({
                error: "dataHora, id_comunidade, dupla1Id e dupla2Id são obrigatórios"
            });
        }

        const data = new Date(dataHora);

        if (isNaN(data.getTime())) {
            return res.status(400).json({
                error: "dataHora inválida"
            });
        }

        const partida = await criarPartidaService(
            data,
            tipo_partida,
            Number(id_comunidade),
            Number(dupla1Id),
            Number(dupla2Id)
        );

        return res.status(201).json({
            message: "Partida criada com sucesso",
            partida
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            error: error instanceof Error
                ? error.message
                : "Erro ao criar partida"
        });
    }
};