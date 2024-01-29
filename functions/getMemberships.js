// functions/getMemberships.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('nftMembershipsApp');
    const collection = database.collection('memberships');

    // Fetch all memberships
    const allMemberships = await collection.find().toArray();

    res.json(allMemberships);
  } catch (error) {
    console.error('Error fetching memberships:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
};
