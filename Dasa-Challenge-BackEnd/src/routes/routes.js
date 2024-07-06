const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
const userController = require("../controller/userController");
const categoryController = require("../controller/categoryController");
const productController = require("../controller/productController");
const AdminAuth = require("../middleware/adminAuth");
const authenticatedUser = require("../middleware/authenticatedUser");

//Home Routes
router.get("/", homeController.index);

// User Routes

router.post("/user", userController.create);
router.get("/users", AdminAuth, userController.index);
router.get("/user/:user_id", authenticatedUser, userController.findUser);
router.put("/user", authenticatedUser, userController.edit);
router.delete("/user/:user_id", authenticatedUser, userController.remove);
router.post(
  "/recoverpassword",
   userController.recoverPassword
);
router.post(
  "/changepassword",
  userController.changePassword
);
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

module.exports = router;
