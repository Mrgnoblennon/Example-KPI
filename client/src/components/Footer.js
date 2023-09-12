import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="blue.500" color="white" p={4}>
      <Flex align="center" justify="center">
        <Text>&copy; {new Date().getFullYear()} Your App</Text>
        <Link href="#" ml={4} _hover={{ textDecor: 'none' }}>
          Privacy Policy
        </Link>
      </Flex>
    </Box>
  );
}

export default Footer;
