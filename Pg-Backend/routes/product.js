const { Router } = require("express");
const controller = require("../controllers/product");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.get("/", verifyTokenAndAuthorization, controller.getAllProducts);
router.get("/view-product", verifyTokenAndAuthorization, controller.viewProduct);
router.post("/increase-view-count", verifyTokenAndAuthorization, controller.increaseViewCount);

module.exports = router;
