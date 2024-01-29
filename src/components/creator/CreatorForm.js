// CreatorForm.js
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Box, Button, Input, Textarea, FormControl, FormLabel, FormHelperText  , Text } from '@chakra-ui/react';
import './CreatorForm.css'; // Import external CSS file

const CreatorForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      symbol: '',
      images: [],
      priceUsd: '',
      benefits: '',
    },
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Convert each image to base64 and append to the FormData
        values.images.forEach((image, index) => {
          const base64Image = image.split(',')[1]; // Extract the base64-encoded image data
          formData.append(`images[${index}]`, base64Image);
        });
        // Append other form fields
        formData.append('title', values.title);
        formData.append('symbol', values.symbol);
        formData.append('priceUsd', values.priceUsd);
        formData.append('benefits', values.benefits);

        // Log FormData for debugging
        console.log('FormData:', formData);

        // Use axios.post with FormData for file uploads
        const response = await axios.post('http://localhost:5000/api/memberships', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Log response for debugging
        console.log('API Response:', response.data);

        console.log('Submitted Values:');
        console.log('Title:', values.title);
        console.log('Symbol:', values.symbol);
    console.log('Price (USD):', values.priceUsd);
console.log('Benefits:', values.benefits);

        // await axios.post('http://localhost:5000/api/deploy', {
        //   title: values.title,
        //   symbol: values.symbol,
        //   priceUsd: values.priceUsd,
        //   benefits: values.benefits,
        // });
        

        onSubmit(response.data);
        formik.resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  return (
    <Box className="form-container">
      <Text className="form-heading" mb="4">
        Create Your NFT
      </Text>
      <Box className="form-box">
        <form onSubmit={formik.handleSubmit}>

          <FormControl className="form-control">
            <FormLabel htmlFor="title" fontWeight="semibold" mb="2">
              Title:
            </FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              rounded="md"
              borderColor="gray.300"
              focusBorderColor="blue.500"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel htmlFor="symbol" fontWeight="semibold" mb="2">
              Symbol:
            </FormLabel>
            <Input
              type="text"
              id="symbol"
              name="symbol"
              rounded="md"
              borderColor="gray.300"
              focusBorderColor="blue.500"
              onChange={formik.handleChange}
              value={formik.values.symbol}
            />
          </FormControl>

          <Box className="form-control image-drop-area" onClick={() => document.getElementById('images').click()}>
            <FormLabel htmlFor="images" fontWeight="semibold" mb="2">
              Images:
            </FormLabel>
            <Input
              type="file"
              id="images"
              name="images"
              multiple
              rounded="md"
              borderColor="transparent"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => {
                const base64Images = Array.from(event.target.files).map((file) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                  });
                });

                // Resolve all promises and update formik values with base64-encoded images
                Promise.all(base64Images).then((images) => {
                  formik.setFieldValue('images', images);
                });
              }}
            />
            <Button variant="outline" size="sm" mt="2">
              Browse Images
            </Button>
          </Box>

          <FormControl className="form-control">
            <FormLabel htmlFor="priceUsd" fontWeight="semibold" mb="2">
              Price (USD):
            </FormLabel>
            <Input
              type="number"
              id="priceUsd"
              name="priceUsd"
              step="0.01"
              rounded="md"
              borderColor="gray.300"
              focusBorderColor="blue.500"
              onChange={formik.handleChange}
              value={formik.values.priceUsd}
            />
          </FormControl>

          <FormControl className="form-control">
            <FormLabel htmlFor="benefits" fontWeight="semibold" mb="2">
              Benefits:
            </FormLabel>
            <Textarea
              id="benefits"
              name="benefits"
              rounded="md"
              borderColor="gray.300"
              focusBorderColor="blue.500"
              onChange={formik.handleChange}
              value={formik.values.benefits}
            />
          </FormControl>

          <FormControl className="form-control">
            <Button
              type="submit"
              colorScheme="blue"
              rounded="md"
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.800' }}
            >
              Create Membership
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default CreatorForm;
