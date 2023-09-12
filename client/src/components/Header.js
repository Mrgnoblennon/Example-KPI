import React from 'react';
import { Box, Flex, Link, Text, Spacer } from '@chakra-ui/react';

function Header() {
  return (
    <Box as="header" bg="green.500" color="white" p={4}>
      <Flex align="center">
        <Link href="#" _hover={{ textDecor: 'none' }}>
          <Text fontSize="2xl" fontWeight="bold">
            KPI Indicator
          </Text>
        </Link>
        <Spacer />
        <Link href="/" _hover={{ textDecor: 'none' }} mr={4}>
          Home
        </Link>
        <Link href="#" _hover={{ textDecor: 'none' }}>
          About
        </Link>
      </Flex>
    </Box>
  );
}

export default Header;
