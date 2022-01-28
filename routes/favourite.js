const express = require("express");

const {
  add_book_mark,
  get_book_mark,
  get_favourite_book,
  add_favourite_book,
  get_favourite_podcast,
  add_favourite_podcast,
  get_favourite_video,
  add_favourite_video,
} = require("../controllers/favouriteController");
const { check_auth } = require("../middleware/auth");

const router = express.Router();

router
  .get("/bookmark/book", check_auth("user"), get_book_mark)
  .post("/bookmark/book", check_auth("user"), add_book_mark);

router
  .get("/favourite/book", check_auth("user"), get_favourite_book)
  .post("/favourite/book", check_auth("user"), add_favourite_book);

router
  .get("/favourite/podcast", check_auth("user"), get_favourite_podcast)
  .post("/favourite/podcast", check_auth("user"), add_favourite_podcast);

router
  .get("/favourite/video", check_auth("user"), get_favourite_video)
  .post("/favourite/video", check_auth("user"), add_favourite_video);

module.exports = router;
