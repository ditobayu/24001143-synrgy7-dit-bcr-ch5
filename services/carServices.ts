import { Request, Response } from "express";
import { CarsModel } from "../model/car";

const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await CarsModel.query();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query().findById(req.params.id);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

// filter by category (small, medium, large)
const getCarsByCategory = async (req: Request, res: Response) => {
  try {
    const cars = await CarsModel.query().where("category", req.params.category);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

const createCar = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query().insert(req.body);
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

const updateCar = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query().findById(req.params.id);
    if (car) {
      await CarsModel.query().findById(req.params.id).patch(req.body);
      res.json({ message: "Car updated" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query().findById(req.params.id);
    if (car) {
      await CarsModel.query().deleteById(req.params.id);
      res.json({ message: "Car deleted" });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

const getCarOrders = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query()
      .findById(req.params.id)
      .withGraphFetched("orders");
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

const getCarOrderById = async (req: Request, res: Response) => {
  try {
    const car = await CarsModel.query()
      .findById(req.params.id)
      .withGraphFetched("orders")
      .modifyGraph("orders", (builder) => {
        builder.findById(req.params.orderId);
      });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "" });
  }
};

export {
  getCars,
  getCarById,
  getCarsByCategory,
  createCar,
  updateCar,
  deleteCar,
  getCarOrders,
  getCarOrderById,
};