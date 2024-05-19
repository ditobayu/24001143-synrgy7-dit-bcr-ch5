import { Request, Response } from "express";
import { OrdersModel } from "../model/order";

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrdersModel.query();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrdersModel.query().findById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrdersModel.query().insert(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrdersModel.query().findById(req.params.id);
    if (order) {
      await OrdersModel.query().findById(req.params.id).patch(req.body);
      res.json({ message: "Order updated" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrdersModel.query().findById(req.params.id);
    if (order) {
      await OrdersModel.query().deleteById(req.params.id);
      res.json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };
