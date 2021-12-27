const express = require("express");

const { signup_ApiController, accountVerify_CodeSubmit_ApiController, resendAccountVerifyCode_ApiController, login_ApiController } = require("../controllers/loginSignup");

const router = express.Router();

router.post("/auth/signup", signup_ApiController);
router.post("/auth/account-verify", accountVerify_CodeSubmit_ApiController);
router.post("/auth/resend-verify-code", resendAccountVerifyCode_ApiController);

router.post("/auth/login", login_ApiController);
module.exports = router;
