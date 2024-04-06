const { Router } = require("express");
const controller = require("../controllers/product");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.get("/", verifyTokenAndAuthorization, controller.getAllProducts);
router.get("/view-product", verifyTokenAndAuthorization, controller.viewProduct);
router.post("/increase-view-count", verifyTokenAndAuthorization, controller.increaseViewCount);
router.post("/list-product", verifyTokenAndAuthorization, controller.listProduct);
router.get("/all-listed-product", verifyTokenAndAuthorization, controller.getAllListedProduct);

module.exports = router;
