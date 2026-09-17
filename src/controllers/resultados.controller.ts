import { Request, Response } from "express";
import { criarResultado as criarResultadoService } from "../services/resultados.service";

export const criarResultado = async (req: Request, res: Response) => {
    try {
        const idPartida = Number(req.params.id);

        const {
            numero_set,
            pontos_dupla1,
            pontos_dupla2
        } = req.body;

        if (!idPartida || !numero_set || pontos_dupla1 === undefined || pontos_dupla2 === undefined) {
            return res.status(400).json({
                error: "id da partida, numero_set, pontos_dupla1 e pontos_dupla2 são obrigatórios"
            });
        }

        const resultado = await criarResultadoService(
            idPartida,
            Number(numero_set),
            Number(pontos_dupla1),
            Number(pontos_dupla2)
        );

        return res.status(201).json({
            message: "Resultado registrado com sucesso",
            resultado
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            error: error instanceof Error
                ? error.message
                : "Erro ao registrar resultado"
        });
    }
};