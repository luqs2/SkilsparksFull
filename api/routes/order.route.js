import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// Correct route for creating an order and payment intent, using POST and passing gigId as a parameter
router.post("/:gigId", verifyToken, intent);  // Use the intent function for creating orders

// Correct route for fetching orders, with GET
router.get("/", verifyToken, getOrders);

// Route for creating a payment intent (for confirming payments)
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put ("/", verifyToken, confirm);

export default router;
