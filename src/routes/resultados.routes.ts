import { Router } from "express";
import { criarPartida } from "../controllers/partidas.controller";
import { criarResultado } from "../controllers/resultados.controller";

const router = Router();

router.post("/", criarPartida);

router.post("/:id/resultado", criarResultado);

export default router;