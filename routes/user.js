const express = require("express");

const { add_book_mark } = require("../controllers/bookMarkController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

router.post("/bookmark", check_auth("user"), add_book_mark);

module.exports = router;
