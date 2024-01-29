// BuyerMarketplace.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Input, Text } from '@chakra-ui/react';

const BuyerMarketplace = () => {
  const [memberships, setMemberships] = useState([]);
  const [filteredMemberships, setFilteredMemberships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await axios.get('/api/memberships');
        console.log('Fetched Memberships:', response.data);
        setMemberships(response.data);
        setFilteredMemberships(response.data); // Initialize with all memberships
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMemberships();
  }, []);



  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filtered = memberships.filter(
      (membership) =>
        membership.title.toLowerCase().includes(searchTermLowerCase) ||
        membership.benefits.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredMemberships(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResetFilters = () => {
    setFilteredMemberships(memberships);
    setSearchTerm('');
  };

  const handlePurchase = (membershipId) => {
    console.log(`Purchase membership with ID: ${membershipId}`);
    // Implement your purchase logic here
  };

  return (
    <Box p="8">
      <Text fontSize="3xl" fontWeight="bold" mb="4" textAlign="center">
        Membership Marketplace
      </Text>

      {/* Search input and buttons for filtering */}
      <Grid templateColumns="1fr 1fr 1fr" gap="4" alignItems="center" mb="6">
        <Input
          type="text"
          placeholder="Search By Title or Benefits"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button colorScheme="blue" onClick={handleSearch}>
          Search
        </Button>
        <Button colorScheme="gray" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </Grid>

      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap="4">
        {filteredMemberships.map((membership) => (
          <Box key={membership._id} bg="white" p="4" borderRadius="md" overflow="hidden" boxShadow="md">
            <img
              src={`data:image/jpeg;base64,${membership.images[0]}`}
              alt=""
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {membership.title}
            </Text>
            <Text color="gray.600" mb="2">
              Symbol: {membership.symbol}
            </Text>
            <Text color="gray.600" mb="2">
              Price (USD): {membership.priceUsd}
            </Text>
            <Box mb="4">
              {membership.benefits.split(',').map((benefit, index) => (
                <Text
                  key={index}
                  bg="green.500"
                  color="white"
                  rounded="full"
                  px="3"
                  py="1"
                  fontSize="sm"
                  display="inline-block"
                  mr="2"
                >
                  {benefit.trim()}
                </Text>
              ))}
            </Box>
            <Button
              colorScheme="blue"
              onClick={() => handlePurchase(membership._id)}
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.800' }}
            >
              Purchase
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default BuyerMarketplace;
