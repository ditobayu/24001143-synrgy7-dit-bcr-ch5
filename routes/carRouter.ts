import express, { Request, Response, NextFunction } from "express";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  getCarOrders,
  getCarOrderById,
} from "../services/carServices";
import { authenticate } from "../middleware/auth";
import upload from "../middleware/uploadHandler";

const router = express.Router();

router.use(authenticate);

router.get("/", getCars);
router.get("/:id", getCarById);
router.post("/", upload.single("image"), createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
router.get("/:id/orders", getCarOrders);
router.get("/:id/orders/:orderId", getCarOrderById);

export default router;
