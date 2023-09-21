import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ADD_PRODUCT } from '../utils/mutations';

function AddProductButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
  });

  const [addProduct] = useMutation(ADD_PRODUCT);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const { data, errors } = await addProduct({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            category: formData.category,
          },
        },
      });
  
      if (errors && errors.length > 0) {
        // Handle GraphQL errors
        console.error(errors);
      }
  
      if (data && data.addProduct) {
        // Product added successfully
        closeModal();
        // You can reset the form here
        setFormData({
          name: '',
          description: '',
          price: 0,
          quantity: 0,
          category: '',
        });
      }
    } catch (error) {
      console.error(error);
      // Handle other errors (e.g., network errors)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        size="md"
        onClick={openModal}
      >
        Add Product
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
              </Input>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Add
            </Button>
            <Button colorScheme="gray" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddProductButton;
