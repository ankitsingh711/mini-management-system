import { Request, Response } from "express";
import * as paymentService from "../services/paymentService";
import { logger } from "../config/logger";
import ElasticClient from "../config/db";

// Record a payment
export const recordPayment = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.recordPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    logger.error("Error recording payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all payments with filtering options
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await paymentService.getPayments(req.query);
    res.status(200).json(payments);
  } catch (error) {
    logger.error("Error fetching payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json(payment);
  } catch (error) {
    logger.error("Error fetching payment by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const makePayment = async (req: Request, res: Response) => {
  try {
    const { customerId, amount } = req.body;
    const payment = await paymentService.makePayment(customerId, amount);
    res.status(200).json({ message: "Payment successful", payment });

    await ElasticClient.index({
      index: "payments",
      body: { customerId, amount, status: "completed", timestamp: new Date() },
    });
  } catch (error) {
    logger.error("Error making payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
