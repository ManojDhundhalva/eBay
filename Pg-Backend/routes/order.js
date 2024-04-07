const { Router } = require("express");
const controller = require("../controllers/order");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.post("/", verifyTokenAndAuthorization, controller.putOrder);

module.exports = router;
