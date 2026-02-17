import { Router } from "express";
import {
  getCentros,
  getCentro,
  createCentro,
  updateCentro,
  deleteCentro
} from "../controllers/centros.controllers.js";

const router = Router();

router.get("/centros", getCentros);
router.get("/centros/:id", getCentro);
router.post("/centros", createCentro);
router.put("/centros/:id", updateCentro);
router.delete("/centros/:id", deleteCentro);

export default router;
