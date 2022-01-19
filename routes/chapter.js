const express = require("express");

const { add_chapter, update_chapter} = require("../controllers/chapterController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

// chapter
router.post("/", check_auth("admin"), add_chapter);
router.put("/", check_auth("admin"), update_chapter);


module.exports = router;
