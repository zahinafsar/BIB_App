const express = require("express");

const { add_book_video, update_book_video, get_all_videos } = require("../controllers/videoController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

// video
router.post("/", check_auth("admin"), add_book_video);
router.put("/", check_auth("admin"), update_book_video);
router.get("/", get_all_videos);
// router.get("/:id", get_book);


module.exports = router;
