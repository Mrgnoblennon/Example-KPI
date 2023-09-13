import React from 'react';
import { Box, Flex, Link, Text, Spacer, Button, IconButton} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

function Header() {
  // Placeholder function for logging out
  const handleLogout = () => {
    // Implement your logout logic here
    alert('Logged out'); // Replace with actual logout code
  };

  return (
    <Box as="header" bg="green.500" color="white" p={4}>
      <Flex align="center">
        <Link href="#" _hover={{ textDecor: 'none' }}>
          <Text fontSize="2xl" fontWeight="bold">
            KPI Indicator
          </Text>
        </Link>
        <Spacer />
        <Button colorScheme="white" variant="outline" mr={4}>
          Sign Up
        </Button>
        <Button colorScheme="white" variant="outline" mr={4}>
          Login
        </Button>
        <Button colorScheme="white" variant="outline" onClick={handleLogout}>
          Log Out
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
