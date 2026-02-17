import { Router } from "express";
import {
  getFacturas,
  getFactura,
  createFactura
} from "../controllers/facturas.controllers.js";

const router = Router();

router.get("/facturas", getFacturas);
router.get("/facturas/:id", getFactura);
router.post("/facturas", createFactura);

export default router;
