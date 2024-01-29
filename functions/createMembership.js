// functions/createMembership.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async (req, res) => {
  try {
    const { title, symbol, images, priceUsd, benefits } = req.body;

    const newMembership = {
      title,
      symbol,
      images,
      priceUsd,
      benefits,
    };

    // Connect to MongoDB
    await client.connect();
    const database = client.db('nftMembershipsApp');
    const collection = database.collection('memberships');

    // Insert new membership
    const result = await collection.insertOne(newMembership);
    newMembership._id = result.insertedId;

    res.status(201).json(newMembership);
  } catch (error) {
    console.error('Error creating membership:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
};
