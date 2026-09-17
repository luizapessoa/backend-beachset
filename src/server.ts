import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import atletasRoutes from "./routes/atletas.routes";
import partidasRoutes from "./routes/partidas.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/atletas", atletasRoutes);
app.use("/partidas", partidasRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API rodando!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});