import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Text, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { REGISTER_USER } from '../utils/mutations'; // Import your GraphQL mutation

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [registerUser] = useMutation(REGISTER_USER);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: {
          input: formData,
        },
      });

      // Handle success, e.g., redirect the user to the login page or show a success message
      console.log('Registration successful:', data);

    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error('Registration error:', error.message);
    }
  };

  return (
    <Box p={4} maxW="400px" mx="auto">
      <Heading as="h2" size="lg" mb={4}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="firstName" mb={4}>
          <FormLabel>First Name</FormLabel>
          <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </FormControl>
        <FormControl id="lastName" mb={4}>
          <FormLabel>Last Name</FormLabel>
          <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </FormControl>
        <Button type="submit" colorScheme="teal" size="lg">
          Sign Up
        </Button>
        <Text mt={2} fontSize="sm" color="gray.500">
          Already have an account? <a href="/signup">Login</a>
        </Text>
      </form>
    </Box>
  );
}

export default Signup;
