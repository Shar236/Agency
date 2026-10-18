import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Inquiry from './models/Inquiry.js';
import Newsletter from './models/Newsletter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saarthi_agency';

app.use(cors());
app.use(express.json());

// In-memory fallback if MongoDB local daemon is not running
let isMongoConnected = false;
const inMemoryInquiries = [];
const inMemoryNewsletters = [];

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000
})
.then(() => {
  isMongoConnected = true;
  console.log('✅ MongoDB connected successfully to saarthi_agency');
})
.catch((err) => {
  isMongoConnected = false;
  console.log('ℹ️ MongoDB not available locally, running with persistent In-Memory MERN Storage fallback.');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    stack: 'MERN (MongoDB, Express, React, Node.js)',
    database: isMongoConnected ? 'MongoDB (Connected)' : 'In-Memory Fallback Active',
    timestamp: new Date().toISOString()
  });
});

// Create new project inquiry (Contact Form)
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, company, phone, subject, services, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and project message are required.' });
    }

    if (isMongoConnected) {
      const newInquiry = await Inquiry.create({
        name,
        email,
        company,
        phone: phone || '',
        subject: subject || '',
        services: services || [],
        message
      });
      return res.status(201).json({ success: true, inquiry: newInquiry });
    } else {
      const fallbackInquiry = {
        id: `inq_${Date.now()}`,
        name,
        email,
        company,
        phone: phone || '',
        subject: subject || '',
        services: services || [],
        message,
        createdAt: new Date()
      };
      inMemoryInquiries.push(fallbackInquiry);
      return res.status(201).json({ success: true, inquiry: fallbackInquiry });
    }
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ error: 'Server error saving inquiry.' });
  }
});

// Get all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    if (isMongoConnected) {
      const list = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, inquiries: list });
    } else {
      return res.json({ success: true, count: inMemoryInquiries.length, inquiries: inMemoryInquiries });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Subscribe to newsletter
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    if (isMongoConnected) {
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        return res.json({ success: true, message: 'Already subscribed.' });
      }
      const sub = await Newsletter.create({ email });
      return res.status(201).json({ success: true, sub });
    } else {
      if (!inMemoryNewsletters.includes(email)) {
        inMemoryNewsletters.push(email);
      }
      return res.status(201).json({ success: true, email });
    }
  } catch (err) {
    console.error('Error subscribing:', err);
    res.status(500).json({ error: 'Server error subscribing to newsletter.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Saarthi MERN Express Server running on http://localhost:${PORT}`);
});
