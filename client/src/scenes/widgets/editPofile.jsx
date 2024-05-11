import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ userId }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: null
  });

  useEffect(() => {
    // Fetch user details based on userId
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstName', user.firstName);
      formData.append('lastName', user.lastName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('location', user.location);
      formData.append('occupation', user.occupation);
      formData.append('picture', user.picture);

      const response = await axios.patch(`/users/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('User details updated:', response.data);
      alert('User details updated successfully!');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details');
    }
  };

  return (
    <div>
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} required /><br />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} required /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required /><br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required /><br />

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={user.location} onChange={handleChange} /><br />

        <label htmlFor="occupation">Occupation:</label>
        <input type="text" id="occupation" name="occupation" value={user.occupation} onChange={handleChange} /><br />

        <label htmlFor="picture">Profile Picture:</label>
        <input type="file" id="picture" name="picture" onChange={handleFileChange} /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
