import { Router } from "express";
import compraController from "./compra.controller";

const router = Router();

router.post("/cart", compraController.addItem);
router.post("/checkout", compraController.checkout);

export default router;