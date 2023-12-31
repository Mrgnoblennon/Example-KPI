import React from 'react';
import { Box, Flex, Link, Text, Button, Spacer, Menu, MenuButton, MenuList, MenuItem, IconButton, Avatar} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import AuthService from '../utils/auth'; // Import your AuthService
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  // Placeholder function for logging out
  const handleLogout = () => {
    
    // Implement your logout logic here
    AuthService.logout(); // Call your logout method, e.g., AuthService.logout()
    navigate('/');
    window.location.reload();
  };

  const isAuthenticated = AuthService.loggedIn(); // Check if the user is authenticated
  const username = isAuthenticated ? AuthService.getProfile().data.username : null;

  return (
    <Box as="header" bg="green.500" color="white" p={4}>
      <Flex align="center">
        <Link href="/" _hover={{ textDecor: 'none' }}>
          <Text fontSize="2xl" fontWeight="bold">
            KPI Indicator
          </Text>
        </Link>
        <Spacer />
        {!isAuthenticated && ( // Render "Sign Up" and "Login" buttons when not authenticated
          <>
            <Link href="/login">
              <Button colorScheme="white" variant="outline" mr={4}>
                Login
              </Button>
            </Link>
          </>
        )}
        {isAuthenticated && ( // Render "Log Out" button when authenticated
        <>
        <Text color="white" mr={2}>
          Welcome, {username}!
        </Text>
        <Link href="/me">
          <Avatar
            name="User's Name"
            src="URL_TO_USER_AVATAR_IMAGE"
            size="md" // Adjust the size as needed
            cursor="pointer" // Add a pointer cursor to indicate it's clickable
          />
        </Link>
      </>
        )}
        
        {/* Burger Menu Dropdown */}
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Open Menu"
        variant="ghost"
        colorScheme="white"
        icon={<HamburgerIcon />}
      />
      <MenuList placement="right"> {/* Set the placement to right */}
        <MenuItem color="black" as='a' href='#'>About</MenuItem>
        <MenuItem color="black" as='a' href='#'>Settings</MenuItem>
        {isAuthenticated && (
          <>
          <MenuItem color="black" as='a' href='/inventory'>Inventory</MenuItem>
          <MenuItem onClick={handleLogout} color="black" as='a'>Logout</MenuItem>
          </>
        )}
      </MenuList>
    </Menu>

      </Flex>
    </Box>
  );
}

export default Header;
