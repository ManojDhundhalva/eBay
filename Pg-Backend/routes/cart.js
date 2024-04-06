const { Router } = require("express");
const controller = require("../controllers/cart");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.get("/", verifyTokenAndAuthorization, controller.getAllCart);
router.post("/", verifyTokenAndAuthorization, controller.addToCart);
router.delete("/", verifyTokenAndAuthorization, controller.deleteFromCart);

module.exports = router;
