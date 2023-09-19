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
          Description: {product.description}
        </Text>
        <Text fontSize="md" color="gray.600">
          Price: ${product.price}
        </Text>
        <Text fontSize="md" color="gray.600">
          Quantity: {product.quantity}
        </Text>
        <Text fontSize="md" color="gray.600">
          Category: {product.category}
        </Text>
        <Text fontSize="md" color="gray.600">
          Created By: {product.createdBy}
        </Text>
        <Text fontSize="md" color="gray.600">
          Created At: {new Date(product.createdAt).toLocaleDateString()}
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
