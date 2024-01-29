const mongoose = require('mongoose');

// MongoDB connection string (replace with your actual credentials and database name)
const mongoURI = "mongodb+srv://admin:BrulTZ9gH5KG63Ki@cluster0.qocy1xl.mongodb.net/nftMembershipsApp?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple mongoose model (example, replace with your actual data model)
const Membership = mongoose.model('Membership', {
  title: String,
  symbol: String,
  image: String,
  priceUsd: Number,
  benefits: String,
});

// Sample data to insert
const sampleData = {
  title: 'Premium Membership',
  symbol: 'PREM',
  image: 'https://example.com/premium.jpg',
  priceUsd: 29.99,
  benefits: 'Access to premium content, exclusive events, and more.',
};

// Create a new membership based on sample data
const newMembership = new Membership(sampleData);

// Save the membership to the database
newMembership.save()
  .then((savedMembership) => {
    console.log('Membership saved successfully:', savedMembership);
  })
  .catch((error) => {
    console.error('Error saving membership:', error);
  })
  .finally(() => {
    // Close the MongoDB connection after saving
    mongoose.connection.close();
  });
