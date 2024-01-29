// CreatorDashboard.js
import React from 'react';
// src/pages/CreatorDashboard.js
import CreatorForm from '../components/creator/CreatorForm';
  // Adjust the path based on your project structure

const CreatorDashboard = () => {
  const handleFormSubmit = values => {
    // Handle form submission logic
    console.log(values);
  };

  return (
    <div>
     
      <CreatorForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreatorDashboard;
