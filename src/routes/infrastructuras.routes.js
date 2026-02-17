import { Router } from "express";
import {
  getInfraestructuras,
  getInfraestructura,
  getInfraestructurasByCentro,
  createInfraestructura,
  updateInfraestructura,
  deleteInfraestructura,
} from "../controllers/infrastructuras.controllers.js";

const router = Router();

router.get("/infrastructuras", getInfraestructuras);

router.get("/infrastructuras/:id", getInfraestructura);
router.get("/infrastructuras/centro/:id", getInfraestructurasByCentro);
router.post("/infrastructuras", createInfraestructura);
router.put("/infrastructuras/:id", updateInfraestructura);
router.delete("/infrastructuras/:id", deleteInfraestructura);

export default router;
