import { Router } from "express";
import { buscarAtletas, criarAtleta, buscarAtletaNiveleDisponibilidade } from "../controllers/atletas.controller";
import { buscarEstatisticas } from "../controllers/estatisticas.controller";

const router = Router();

router.post("/", criarAtleta);

router.get("/", buscarAtletas);

router.get(
    "/nivel-disponibilidade",
    buscarAtletaNiveleDisponibilidade
);

router.get("/:id/estatisticas", buscarEstatisticas);

export default router;