// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');




const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mongoURI = "mongodb+srv://admin:BrulTZ9gH5KG63Ki@cluster0.qocy1xl.mongodb.net/nftMembershipsApp?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const Membership = mongoose.model('Membership', {
  title: String,
  symbol: String,
  images: [String],
  priceUsd: Number,
  benefits: String,
});

app.post('/api/memberships', upload.array('images', 5), async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);

    const newMembership = new Membership({
      title: req.body.title,
      symbol: req.body.symbol,
      images: req.body.images,
      priceUsd: req.body.priceUsd,
      benefits: req.body.benefits,
    });

    await newMembership.save();

    console.log('New Membership:', newMembership);

    res.status(201).json(newMembership);
  } catch (error) {
    console.error('Error creating membership:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/deploy', async (req, res) => {
  try {
    // Destructure values from the request body
    const { title, symbol, priceUsd, benefits } = req.body;

    // Get the path to the current Node.js executable (includes 'node' in the path)

    const npxPath = 'C:/Program Files/nodejs/npx.cmd'; // Replace with the actual path to npx

    const deployProcess = spawn(npxPath, [
      'hardhat',
      'run',
      'scripts/deploy_custom_nft.js',
      'DefaultTitle',
      'DefaultSymbol',
      '1000',
      'DefaultBenefits',
    ]);
    

    
    // Log the script output
    deployProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    // Log any errors
    deployProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    // On process exit
    deployProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);

      if (code === 0) {
        // Send back success response
        res.status(201).json({ message: 'Deployment initiated successfully' });
      } else {
        // Send back error response
        res.status(500).json({ error: 'Failed to initiate deployment' });
      }
    });
  } catch (error) {
    console.error('Error initiating deployment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/memberships', async (req, res) => {
    try {
      const allMemberships = await Membership.find();
      res.json(allMemberships);
    } catch (error) {
      console.error('Error fetching memberships:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// server.js
app.get('/api/memberships/:id/image', async (req, res) => {
    try {
      const membership = await Membership.findById(req.params.id);
  
      if (!membership || !membership.image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      const imageBuffer = Buffer.from(membership.image, 'base64');
      res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': imageBuffer.length,
      });
      res.end(imageBuffer);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
