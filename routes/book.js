const express = require("express");

const { add_book, get_all_book, get_book, update_book, get_all_book_admin} = require("../controllers/bookController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

// book
router.post("/", check_auth("admin"), add_book);
router.put("/", check_auth("admin"), update_book);
router.get("/", check_auth("user"), get_all_book);
router.get("/:id", check_auth("user"), get_book);

module.exports = router;
