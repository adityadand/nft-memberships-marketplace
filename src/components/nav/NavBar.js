import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Flex, Box, Text } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Flex
      bg="blue.500"
      h="40px" // Adjust height as needed
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="white">
          My App
        </Text>
      </Box>
      <Box display="flex" alignItems="center">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <Box
            p="2"
            mr="4"
            color="white"
            borderRadius="md"
            _hover={{ bg: 'blue.600', cursor: 'pointer' }}
          >
            Home
          </Box>
        </Link>
        <Link to="/creator" style={{ textDecoration: 'none' }}>
          <Box
            p="2"
            mr="4"
            color="white"
            borderRadius="md"
            _hover={{ bg: 'blue.600', cursor: 'pointer' }}
          >
            Creator
          </Box>
        </Link>
        <Link to="/buyer" style={{ textDecoration: 'none' }}>
          <Box
            p="2"
            color="white"
            borderRadius="md"
            _hover={{ bg: 'blue.600', cursor: 'pointer' }}
          >
            Buyer
          </Box>
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
