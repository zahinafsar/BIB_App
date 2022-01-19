const express = require("express");

const { add_book_podcast, update_book_podcast, get_all_podcasts } = require("../controllers/podcastController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

// podcast
router.post("/", check_auth("admin"), add_book_podcast);
router.put("/", check_auth("admin"), update_book_podcast);
router.get("/", get_all_podcasts);



module.exports = router;
