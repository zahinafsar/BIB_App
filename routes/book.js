const express = require("express");

const { add_book, get_books, add_chapter, get_book, update_chapter, update_book } = require("../controllers/bookController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();
// book
router.post("/book", check_auth("admin"), add_book);
router.put("/book", check_auth("admin"), update_book);
router.get("/books", get_books);
router.get("/book/:id", get_book);

// chapter
router.post("/book/chapter", check_auth("admin"), add_chapter);
router.put("/book/chapter", check_auth("admin"), update_chapter);

module.exports = router;
