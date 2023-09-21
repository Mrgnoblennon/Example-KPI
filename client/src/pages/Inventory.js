import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import { ADD_PRODUCT } from '../utils/mutations';
import ProductCard from '../components/ProductCard';
import AddProductButton from '../components/AddProductButton'

const Inventory = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  console.log('data:', data); // Add this line for debugging

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const products = data.getAllProducts;

  console.log('products:', products); // Add this line for debugging

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Inventory
      </Text>
      <AddProductButton />
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
        {products.map((product) => (
          <GridItem key={product._id}>
            <ProductCard product={product} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Inventory;
