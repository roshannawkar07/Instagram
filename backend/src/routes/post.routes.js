const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware.js");

/**
 * POST /api/posts [protected]
 * - req.body = { caption,image-file }
 */
postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

//get Post Rout
postRouter.get("/", identifyUser, postController.getPostController);

//return an detail about specific post
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);
module.exports = postRouter;
