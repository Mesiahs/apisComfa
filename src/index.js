import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/user.routes.js"
import centrosRoutes from "./routes/centros.routes.js";
import infraRoutes from "./routes/infrastructuras.routes.js";
import reservRoutes from "./routes/reservaciones.routes.js";


const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use("/users", userRoutes);

app.use(centrosRoutes);
app.use(infraRoutes);
app.use(reservRoutes);


app.listen(PORT);
console.log('Server on port', PORT); 