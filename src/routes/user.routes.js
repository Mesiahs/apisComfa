import { Router } from "express";

const router = Router();

router.get("/users", (req, res) => {
  res.send("obteniendo usuarios");
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send("obteniendo usuario" + id);
});

router.post("/users", (req, res) => {
  res.send("creando usuario");
});

router.delete("/users/:id", (req, res) => {
  res.send("eliminando usuarios");
});

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send("actualizando usuario" + id);
});

export default router;
