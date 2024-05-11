import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const EditProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    occupation: user.occupation,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box>
      <Typography variant="h6">Edit Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          name="occupation"
          label="Occupation"
          value={formData.occupation}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditProfileForm;
