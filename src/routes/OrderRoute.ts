import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.get("/",jwtCheck,jwtParse,OrderController.getMyOrders);
router.post("/checkout", jwtCheck, jwtParse, OrderController.createOrder);

export default router;
