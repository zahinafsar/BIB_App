const express = require("express");

const { add_book } = require("../controllers/bookController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

router.post("/book", check_auth("admin"), add_book);

module.exports = router;
