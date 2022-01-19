const express = require("express");

const { add_book, get_all_book, get_book, update_book} = require("../controllers/bookController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

// book
router.post("/", check_auth("admin"), add_book);
router.put("/", check_auth("admin"), update_book);
router.get("/", get_all_book);
router.get("/:id", get_book);


module.exports = router;
