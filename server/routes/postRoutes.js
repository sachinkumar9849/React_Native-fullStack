const express = require("express");
const { requireSingIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
} = require("../controllers/postController");

//router object
const router = express.Router();

// create post || post
router.post("/create-post", requireSingIn, createPostController);

// get all post
router.get("/get-all-post", getAllPostsController);

// get user post
router.get("/get-user-post", requireSingIn, getUserPostsController);

//export
module.exports = router;
