import React from 'react';
import { Box, Flex, Stat, StatLabel, StatNumber, StatHelpText, Spacer } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Flex align="center">
        <Stat>
          <StatLabel>Total Sales</StatLabel>
          <StatNumber>$10,000</StatNumber>
          <StatHelpText>Since last month</StatHelpText>
        </Stat>
        <Spacer />
        <Stat>
          <StatLabel>Current Stock</StatLabel>
          <StatNumber>500</StatNumber>
          <StatHelpText>Items in inventory</StatHelpText>
        </Stat>
        <Spacer />
        <Stat>
          <StatLabel>Top Selling Product</StatLabel>
          <StatNumber>Product A</StatNumber>
          <StatHelpText>Quantity Sold: 100</StatHelpText>
        </Stat>
      </Flex>
    </Box>
  );
}

export default Dashboard;
