import { Router } from "express";
import { buscarAtletas, criarAtleta, buscarAtletaNiveleDisponibilidade} from "../controllers/atletas.controller";

const router = Router();

router.post("/", criarAtleta);
router.get("/", buscarAtletas);
router.get("/nivel-disponibilidade", buscarAtletaNiveleDisponibilidade);

export default router;
