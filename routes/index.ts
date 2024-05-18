import { Router } from "express";

import carRouter from "./carRouter";
import authRouter from "./authRouter";

const router = Router();

router.use("/cars", carRouter);
router.use("/auth", authRouter);

export default router;
