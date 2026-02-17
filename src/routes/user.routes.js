import { json, Router } from "express";
import {pool} from '../db.js'
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/user.controllers.js"

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser );
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;