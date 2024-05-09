import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  postId: { type: Schema.Types.ObjectId, ref: "Posts" },
  comment: { type: String, required: true },
  replies: [
    {
      rid: { type: mongoose.Schema.Types.ObjectId },
      userId: { type: Schema.Types.ObjectId, ref: "Users" },
      form: { type: String },
      replyAt: { type: String },
      comment: { type: String },
      createAt: { type: Date, default: Date.now() },
      updateAt: { type: Date, default: Date.now() },
      likes: [{ type: String }],
    },
  ],
  likes: [{ type: String }],
});
const Comments = mongoose.model("Comments", commentSchema);
export default Comments;
