import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const AddProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({ name: '', description: '', price: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    // Send the product data to the server (e.g., via an API call)
    // Once the product is added, you can update the UI accordingly
    onAddProduct(product);
    // Clear the form or reset the state
    setProduct({ name: '', description: '', price: 0 });
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input type="text" name="name" value={product.name} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" value={product.description} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input type="number" name="price" value={product.price} onChange={handleChange} />
      </FormControl>
      <Button mt="4" colorScheme="teal" onClick={handleSubmit}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProductForm;
