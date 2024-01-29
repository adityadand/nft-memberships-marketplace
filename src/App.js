import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreatorDashboard from './pages/CreatorDashboard';
import BuyerMarketplace from './components/buyer/BuyerMarketPlace';
import HomePage from './components/home/HomePage';
import NavBar from './components/nav/NavBar';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={<HomePage />} // Render HomePage directly without NavBar
          />
          <Route
            path="/*" // Catch-all for other routes
            element={
              <>
                <NavBar />
                <div>
                  <Routes>
                    <Route path="/creator" element={<CreatorDashboard />} />
                    <Route path="/buyer" element={<BuyerMarketplace />} />
                    {/* Other routes if needed */}
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
