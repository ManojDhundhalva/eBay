const { Router } = require("express");
const controller = require("../controllers/seller");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.get("/", verifyTokenAndAuthorization, controller.getBankAccount);

module.exports = router;
