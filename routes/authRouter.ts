import express, { Request, Response, NextFunction } from "express";
import { register, login, logout } from "../services/authServices";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
