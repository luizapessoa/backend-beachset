import express from "express";
import atletaRoutes from "./routes/atletas.routes";

const app = express();

app.use(express.json());

app.use("/atletas", atletaRoutes);

export default app;

