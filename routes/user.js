const express = require("express");

const {
  get_my_profile,
  edit_my_profile,
} = require("../controllers/userController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

router
  .get("/me", check_auth("user"), get_my_profile)
  .patch("/me", check_auth("user"), edit_my_profile);

module.exports = router;
