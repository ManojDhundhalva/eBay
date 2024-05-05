const { Router } = require("express");
const controller = require("../controllers/inventory");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.post("/", verifyTokenAndAuthorization, controller.getAllListedInventoryProduct);
router.get("/", verifyTokenAndAuthorization, controller.getCityOfInventory);
router.post("/queue", verifyTokenAndAuthorization, controller.getQueueOfInventory);
router.post("/received-product", verifyTokenAndAuthorization, controller.getAllReceivedProduct);

module.exports = router;
