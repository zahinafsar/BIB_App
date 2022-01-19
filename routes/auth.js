const express = require("express");

const { signup_ApiController, accountVerify_CodeSubmit_ApiController, resendAccountVerifyCode_ApiController, login_ApiController } = require("../controllers/loginSignup");

const router = express.Router();

router.post("/signup", signup_ApiController);
router.post("/account-verify", accountVerify_CodeSubmit_ApiController);
router.post("/resend-verify-code", resendAccountVerifyCode_ApiController);

router.post("/login", login_ApiController);
module.exports = router;
