import { Box, useMediaQuery,TextField, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState(""); 



  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value); // Step 2: Handle search input change
  };
  const handleSearchButtonClick = () => {
    // Perform search action here, like filtering posts based on searchQuery
    console.log("Search for:", searchQuery);
  };


  return (
    <Box>
      <Navbar /> 
     
      <Box 
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"} 
        >
           <TextField // Step 2: Add search input field
             label="Search Posts"
             variant="outlined"
             value={searchQuery}
             onChange={handleSearchInputChange}
             fullWidth
             margin="normal"
          />
          <IconButton onClick={handleSearchButtonClick}>
          <Search />
          </IconButton>
           
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} searchQuery={searchQuery} /> {/* Step 3: Pass search query to PostsWidget */}
        
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
