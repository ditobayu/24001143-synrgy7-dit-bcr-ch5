import { Router } from "express";

import carRouter from "./carRouter";
import authRouter from "./authRouter";
import orderRouter from "./orderRouter";

const router = Router();

router.use("/cars", carRouter);
router.use("/auth", authRouter);
router.use("/orders", orderRouter);

export default router;
