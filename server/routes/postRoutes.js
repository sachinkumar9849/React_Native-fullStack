const express = require("express");
const { requireSingIn } = require("../controllers/userController");
const { createPostController, getAllPostsController } = require("../controllers/postController");

//router object
const router = express.Router();

// create post || post 
router.post("/create-post", requireSingIn,createPostController);

// get all post 
// get all post 
router.get("/get-all-post", getAllPostsController);



//export
module.exports= router;