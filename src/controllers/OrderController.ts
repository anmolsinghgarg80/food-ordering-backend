import { Request, Response } from "express";
import Order from "../models/order";
import Restaurant from "../models/restaurant";

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { cartItems, restaurantId, deliveryDetails, totalAmount } = req.body;


    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      cartItems,
      deliveryDetails,
      totalAmount,
      status: "placed",
      createdAt: new Date(),
    });
    await newOrder.save();
    res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Order" });
    return;
  }
};

export default {
  getMyOrders,
  createOrder
};
