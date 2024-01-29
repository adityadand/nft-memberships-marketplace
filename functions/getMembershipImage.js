// functions/getMembershipImage.js
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async (req, res) => {
  try {
    const membershipId = req.params.id;

    // Connect to MongoDB
    await client.connect();
    const database = client.db('nftMembershipsApp');
    const collection = database.collection('memberships');

    // Find membership by ID
    const membership = await collection.findOne({ _id: ObjectId(membershipId) });

    if (!membership || !membership.images || membership.images.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Assuming images are stored as base64 strings
    const imageBuffer = Buffer.from(membership.images[0], 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': imageBuffer.length,
    });
    res.end(imageBuffer);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};
