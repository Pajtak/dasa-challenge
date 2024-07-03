const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");
const userController = require("../controller/userController");
const categoryController = require("../controller/categoryController");
const productController = require("../controller/productController");
const AdminAuth = require("../middleware/adminAuth");

//Home Routes
router.get("/", homeController.index);

// User Routes

router.post("/user", userController.create);
router.get("/users", AdminAuth, userController.index);
router.get("/user/:user_id", userController.findUser);
router.put("/user", AdminAuth, userController.edit);
router.delete("/user/:user_id", AdminAuth, userController.remove);
router.post("/recoverpassword", userController.recoverPassword);
router.post("/changepassword", userController.changePassword);
router.post("/login", userController.login);

// Category Routes
router.post("/category", AdminAuth, categoryController.create);
router.get("/category", categoryController.index);
router.get("/category/:category_id", categoryController.findCategory);
router.get("/category/:category_name", categoryController.findCategoryByName);
router.put(
  "/category/:category_id",
  AdminAuth,
  categoryController.editCategory
);
router.delete(
  "/category/:category_id",
  AdminAuth,
  categoryController.deleteCategory
);

//Product Routes
router.post("/product", AdminAuth, productController.create);
router.get("/product", productController.index);
router.get("/product/:product_id", productController.findProduct);
router.get("/product/:product_name", productController.findProductByName);
router.put("/product/:product_id", AdminAuth, productController.editProduct);
router.delete(
  "/product/:product_id",
  AdminAuth,
  productController.deleteProduct
);

module.exports = router;
