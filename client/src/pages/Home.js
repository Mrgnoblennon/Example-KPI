import React from 'react';
import { Box, Heading, Flex, Grid, Image, Text, Button } from '@chakra-ui/react';

function HomePage() {
  // Dummy product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$19.99',
      imageUrl: 'product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$29.99',
      imageUrl: 'product2.jpg',
    },
    {
        id: 3,
        name: 'Product 3',
        price: '$39.99',
        imageUrl: 'product3.jpg',
      },
    // Add more product data as needed
  ];

  return (
    <Box>
      {/* Hero section */}
      <Box bg="blue.500" color="white" py={10} textAlign="center">
        <Heading as="h1" size="xl" mb={4}>
          Welcome to a visual representation
        </Heading>
        <Text fontSize="lg">
          Discover any buisness flaws.
        </Text>
      </Box>

      {/* Featured Products section */}
      <Box my={8}>
        <Heading as="h2" size="lg" mb={4}>
          Featured Products
        </Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
          {products.map((product) => (
            <Box
              key={product.id}
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              p={4}
            >
              <Image src={product.imageUrl} alt={product.name} />
              <Text mt={2}>{product.name}</Text>
              <Text fontWeight="bold" mt={2}>
                {product.price}
              </Text>
              <Button colorScheme="blue" mt={2} size="sm">
                Add to Cart
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
