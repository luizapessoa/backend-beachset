import { Request, Response } from "express";
import { buscarEstatisticasAtleta } from "../services/estatisticas.service";

export const buscarEstatisticas = async (
    req: Request,
    res: Response
) => {
    try {

        const idAtleta = Number(req.params.id);

        if (!Number.isInteger(idAtleta) || idAtleta <= 0) {
            return res.status(400).json({
                error: "ID do atleta inválido"
            });
        }

        const estatisticas = await buscarEstatisticasAtleta(idAtleta);

        return res.status(200).json(estatisticas);

    } catch (error) {

        console.error(error);

        return res.status(404).json({
            error: error instanceof Error
                ? error.message
                : "Erro ao buscar estatísticas"
        });
    }
};