import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getComments,
  deletePost,
  editPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/comments/:post", verifyToken, getComments);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/*EDIT*/
router.patch("/:id/edit", verifyToken, editPost);

/* DELETE */
router.delete("/:id", verifyToken, deletePost);

export default router;
