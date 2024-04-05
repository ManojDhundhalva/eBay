const { Router } = require("express");
const controller = require("../controllers/cart");

const router = Router();

router.get("/", controller.getAllCart);

module.exports = router;
