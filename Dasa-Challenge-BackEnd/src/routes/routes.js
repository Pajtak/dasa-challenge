import express from "express";

import homeController from "../controller/homeController.js";
import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";
import productController from "../controller/productController.js";
import { AdminAuth } from "../middleware/adminAuth.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";

export const router = express.Router();

//Home Routes
router.get("/", homeController.index);

// User Routes

router.post("/user", userController.create);
router.get("/users", AdminAuth, userController.index);
router.get("/user/:user_id", authenticatedUser, userController.findUser);
router.put("/user", authenticatedUser, userController.edit);
router.delete("/user/:user_id", authenticatedUser, userController.remove);
router.post("/recoverpassword", userController.recoverPassword);
router.post("/changepassword", userController.changePassword);
router.post("/login", userController.login);

// Category Routes
router.post("/category", authenticatedUser, categoryController.create);
router.get("/category", categoryController.index);
router.get("/category/:category_id", categoryController.findCategory);
router.put(
  "/category/:category_id",
  authenticatedUser,
  categoryController.editCategory
);
router.delete(
  "/category/:category_id",
  authenticatedUser,
  categoryController.deleteCategory
);

//Product Routes
router.post("/product", authenticatedUser, productController.create);
router.get("/product", productController.index);
router.get("/product/:product_id", productController.findProduct);
router.put(
  "/product/:product_id",
  authenticatedUser,
  productController.editProduct
);
router.delete(
  "/product/:product_id",
  authenticatedUser,
  productController.deleteProduct
);
