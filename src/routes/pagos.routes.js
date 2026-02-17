import { Router } from "express";
import {
  getPagos,
  getPago,
  createPago
} from "../controllers/pagos.controllers.js";

const router = Router();

router.get("/pagos", getPagos);
router.get("/pagos/:id", getPago);
router.post("/pagos", createPago);

export default router;
