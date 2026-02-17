import { Router } from "express";
import {
  getCierres,
  getCierre,
  createCierre
} from "../controllers/cierre_caja.controllers.js";

const router = Router();

router.get("/cierres", getCierres);
router.get("/cierres/:id", getCierre);
router.post("/cierres", createCierre);

export default router;
