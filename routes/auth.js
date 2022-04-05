const express = require("express");

const { signup_ApiController, accountVerify_CodeSubmit_ApiController, resendAccountVerifyCode_ApiController, login_ApiController, change_password } = require("../controllers/authController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup_ApiController);
router.post("/account-verify", accountVerify_CodeSubmit_ApiController);
router.post("/resend-verify-code", resendAccountVerifyCode_ApiController);
router.post("/login", login_ApiController);
router.post("/change_passsword", check_auth("user"), change_password);


module.exports = router;
