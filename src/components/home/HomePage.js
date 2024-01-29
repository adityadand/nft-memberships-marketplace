// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Heading, Button } from '@chakra-ui/react';
import './HomePage.css'; // Import the CSS file

// Define the homepage component
const HomePage = () => {
  const [gradient, setGradient] = useState('linear-gradient(45deg, brown, #282c34)');
  const [creatorButtonColor, setCreatorButtonColor] = useState('#2196F3'); // Initial color for Creator button
  const [buyerButtonColor, setBuyerButtonColor] = useState('#FF9800'); // Initial color for Buyer button
  const [creatorGlowColor, setCreatorGlowColor] = useState('#1565C0'); // Initial glow color for Creator button
  const [buyerGlowColor, setBuyerGlowColor] = useState('#FFA000'); // Initial glow color for Buyer button

  useEffect(() => {
    // Function to generate a random color
    const getRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

    // Generate a random gradient and button colors
    const randomGradient = `linear-gradient(45deg, #${getRandomColor()}, #${getRandomColor()})`;
    const randomCreatorButtonColor = `#${getRandomColor()}`;
    let randomBuyerButtonColor;

    // Make sure Buyer button color is different from Creator button color
    do {
      randomBuyerButtonColor = `#${getRandomColor()}`;
    } while (randomBuyerButtonColor === randomCreatorButtonColor);

    // Generate random glow colors for buttons
    const randomCreatorGlowColor = `#${getRandomColor()}`;
    const randomBuyerGlowColor = `#${getRandomColor()}`;

    // Set the generated gradient and button colors
    setGradient(randomGradient);
    setCreatorButtonColor(randomCreatorButtonColor);
    setBuyerButtonColor(randomBuyerButtonColor);
    setCreatorGlowColor(randomCreatorGlowColor);
    setBuyerGlowColor(randomBuyerGlowColor);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to calculate contrast ratio between two colors
  const getContrastRatio = (color1, color2) => {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
    return contrastRatio;
  };

  // Function to calculate luminance of a color
  const getLuminance = (color) => {
    const rgb = parseInt(color.slice(1), 17); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate relative luminance using sRGB coefficients
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return luminance;
  };

  // Calculate contrast ratio between button color and background
  const creatorContrastRatio = getContrastRatio(creatorButtonColor, gradient);
  const buyerContrastRatio = getContrastRatio(buyerButtonColor, gradient);

  // Set text color of buttons based on contrast ratio
  const creatorTextColor = creatorContrastRatio > 3 ? 'white' : 'black';
  const buyerTextColor = buyerContrastRatio > 3 ? 'white' : 'black';

  return (
    <Flex
      className="HomePage-container"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      style={{ background: gradient }}
    >
      <div className="HomePage-heading">
        {/* Heading at the top */}
        <Heading
          fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
          textAlign="center"
          color="white"
          textShadow="0 0 10px rgba(255,255,255,0.8)"
          mb={6}
          mt={-8} // Move the heading bit upper
        >
          NFT Marketplace
        </Heading>
      </div>

      <div className="HomePage-buttons">
        {/* Creator Button */}
        <Link to="/creator">
          <Button
            className="HomePage-button"
            variant="outline"
            colorScheme="blue"
            size="10xl" // Increase button size
            my={4}
            _hover={{
              boxShadow: `0 0 20px ${creatorGlowColor}`, // Add glow effect on hover
            }}
            style={{
              backgroundColor: creatorButtonColor,
              color: creatorTextColor,
            }}
          >
            I'm a Creator
          </Button>
        </Link>

        {/* Buyer Button */}
        <Link to="/buyer">
          <Button
            className="HomePage-button"
            variant="outline"
            colorScheme="orange"
            size="10xl" // Increase button size
            my={4}
            _hover={{
              boxShadow: `0 0 20px ${buyerGlowColor}`, // Add glow effect on hover
            }}
            style={{
              backgroundColor: buyerButtonColor,
              color: buyerTextColor,
            }}
          >
            I'm a Buyer
          </Button>
        </Link>
      </div>
    </Flex>
  );
};

export default HomePage;
