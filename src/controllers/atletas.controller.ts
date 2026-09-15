import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { NivelHabilidade, DiaSemana } from "@prisma/client";
import bcrypt from "bcryptjs";

export const criarAtleta = async (req: Request, res: Response) => {

    try {
    const {nome, email, senha, nivelHabilidade, posicaoPreferencial,
        funcaoTatica, cidade} = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const atleta = await prisma.atleta.create({
    data: {
        nome,
        email,
        senhaHash,
        nivelHabilidade,
        posicaoPreferencial,
        funcaoTatica,
        cidade
    }
});

    res.status(201).json({id: atleta.id, nome, email});
} catch (error) {
    res.status(500).json({error: "erro ao criar atleta"});
}
};

export const buscarAtletas = async (req: Request, res: Response) => {

    try {

        const atletas = await prisma.atleta.findMany({select: 
            {
            id: true,
            nome: true,
            email: true,
            nivelHabilidade: true,
            posicaoPreferencial: true,
            funcaoTatica: true,
            cidade: true
        }});

        return res.status(200).json(atletas);


    } catch (error) {
        res.status(500).json({error: "erro ao buscar atletas"});

    }
};

export const buscarAtletaNiveleDisponibilidade = async (req: Request, res: Response) => {

   try {
        const atletas = await prisma.atleta.findMany({select:{
            id: true,
            nome: true,
            email: true,
            nivelHabilidade: true,
            posicaoPreferencial: true,
            funcaoTatica: true,
            cidade: true
        },
            where: {
                nivelHabilidade: req.query.nivelHabilidade as NivelHabilidade,

                disponibilidades: {
                    some: {
                        diaSemana: req.query.disponibilidade as DiaSemana
                    }
                }
            }
        });

        res.status(200).json(atletas);
    } catch (error) {
        res.status(500).json({error: "erro ao buscar atletas"});
    }
};