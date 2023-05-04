import { Router } from "express";
const router = Router();
import { CartManager } from '../../manager/cartManager.js';
const cartManager = new CartManager('./carrito.json');