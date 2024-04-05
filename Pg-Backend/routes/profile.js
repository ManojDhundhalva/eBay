const { Router } = require("express");
const controller = require("../controllers/profile");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyUser");

const router = Router();

router.get("/", verifyTokenAndAuthorization, controller.getProfile);
router.post("/", verifyTokenAndAuthorization, controller.updateProfile);

module.exports = router;
