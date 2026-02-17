import { Router } from "express";
import {
  getReservaciones,
  getReservacion,
  createReservacion,
  updateReservacion,
  deleteReservacion
} from "../controllers/reservaciones.controllers.js";

const router = Router();

router.get("/reservaciones", getReservaciones);
router.get("/reservaciones/:id", getReservacion);
router.post("/reservaciones", createReservacion);
router.put("/reservaciones/:id", updateReservacion);
router.delete("/reservaciones/:id", deleteReservacion);

export default router;
