import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Import your login mutation
import AuthService from '../utils/auth';

function Login() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [loginUser] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: formData,
      });

      // Handle success, e.g., redirect the user or show a success message
      console.log('Login successful:', data);

      AuthService.login(data.login.token);

    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error('Login error:', error.message);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="emailOrUsername" isRequired>
          <FormLabel>Email or Username</FormLabel>
          <Input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            autoComplete="off"
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          variant="solid"
          width="full"
          mt={6}
        >
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
