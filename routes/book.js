const express = require("express");

const { add_book, get_books } = require("../controllers/bookController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

router.post("/book", check_auth("admin"), add_book);
router.get("/books", get_books);

module.exports = router;
