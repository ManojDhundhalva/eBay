const { Router } = require("express");
const controller = require("../controllers/product");

const router = Router();

router.get("/", controller.getAllProducts);

module.exports = router;
