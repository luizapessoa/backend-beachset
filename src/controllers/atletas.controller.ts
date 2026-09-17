import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { nivel_habilidade_enum, dia_semana_enum } from "@prisma/client";
import bcrypt from "bcryptjs";

export const criarAtleta = async (req: Request, res: Response) => {

    try {
        const {
            nome_atleta,
            email,
            senha,
            nivelHabilidade,
            posicaoPreferencial,
            cidade
        } = req.body;

        const senhaHash = await bcrypt.hash(senha, 10);

        const atleta = await prisma.atleta.create({
            data: {
                nome_atleta,
                email,
                senha_hash: senhaHash,
                nivelHabilidade,
                posicaoPreferencial,
                cidade
            }
        });

        res.status(201).json({
            id: atleta.id_atleta,
            nome_atleta: atleta.nome_atleta,
            email: atleta.email
        });

    } catch (error) {
        res.status(500).json({
            error: "erro ao criar atleta"
        });
    }
};

export const buscarAtletas = async (req: Request, res: Response) => {

    try {

        const atletas = await prisma.atleta.findMany({select: {
        id_atleta: true,
        nome_atleta: true,
        email: true,
        nivelHabilidade: true,
        posicaoPreferencial: true,
        cidade: true
    }
});

        return res.status(200).json(atletas);


    } catch (error) {
        res.status(500).json({error: "erro ao buscar atletas"});

    }
};
export const buscarAtletaNiveleDisponibilidade = async (req: Request, res: Response) => {

    try {
        const atletas = await prisma.atleta.findMany({
            select: {
                id_atleta: true,
                nome_atleta: true,
                email: true,
                nivelHabilidade: true,
                posicaoPreferencial: true,
                cidade: true
            },
            where: {
                nivelHabilidade: req.query.nivelHabilidade as nivel_habilidade_enum,

                disponibilidade: {
                    some: {
                        diaSemana: req.query.disponibilidade as dia_semana_enum
                    }
                }
            }
        });

        res.status(200).json(atletas);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "erro ao buscar atletas"
        });
    }
};