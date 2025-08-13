const express =require("express");

const authMiddleware =require("../middlewares/authMiddleware");

const {
createFoodController,
updateFoodController,
getAllFoodsController,
getSingleFoodController,
getFoodByResturantController,
deleteFoodController,
placeOrderController,orderStatusController
} =require("../controllers/foodController");

const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/create",authMiddleware,createFoodController);

router.put("/update/:id",authMiddleware,updateFoodController);

router.get("/getAll",getAllFoodsController);

router.get("/get/:id",getSingleFoodController);

router.get("/getByResturant/:id",getFoodByResturantController);

router.delete("/delete/:id",authMiddleware,deleteFoodController);

router.post("/placeorder",authMiddleware,placeOrderController);

router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController)

module.exports=router;