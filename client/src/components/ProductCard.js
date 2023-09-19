import React from 'react';
import { Box, Image, Heading, Text, Button } from '@chakra-ui/react';

const ProductCard = ({ product }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={4}
      mb={4}
      w="300px"
    >
      <Image src={product.imageURL} alt={product.name} maxH="200px" objectFit="cover" />

      <Box mt="2">
        <Heading fontSize="xl">{product.name}</Heading>
        <Text fontSize="md" color="gray.600">
          {product.description}
        </Text>
      </Box>

      <Box mt="2" d="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          ${product.price}
        </Text>
        <Button colorScheme="teal" size="sm">
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
