import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutline,
  EditOutlined,
  CheckOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { ToastContainer, toast } from "react-toastify";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath, 
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const [isEditing, setIsEditing] = useState(false); 
  const [editedDescription, setEditedDescription] = useState(description); 

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async () => {
    try {
     
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Post Deleted Successfully");
        toast.success("Post Deleted Successfull");

          // Reload the page to fetch the updated list of posts
        window.location.reload();

      } else {
        console.error("Failed to delete post");
        toast.error("Failed to delete post");

      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };

  const editPost = () => {
    setIsEditing(true);
  };

  const saveEditedPost = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editedDescription }),
      });
      if (response.ok) {
        console.log("Post Edited Successfully");
        toast.success("Post Edited Successfully");
        setIsEditing(false);
        // Optionally, you can update the state or reload the posts after editing
      } else {
        console.error("Failed to edit post");
        toast.error("Failed to edit post");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      toast.error("Error editing post");
    }
  };
  


 

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />   
       {isEditing ? (
        <Box>
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <IconButton onClick={saveEditedPost}>
            <CheckOutlined />
          </IconButton>
        </Box>
      ) : (
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
      )}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton onClick={editPost}>
          <EditOutlined />
        </IconButton>

        
        <IconButton onClick={deletePost}>
          <DeleteOutline />
        </IconButton>
        
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
       <ToastContainer />
    </WidgetWrapper>
  );
};

export default PostWidget;
