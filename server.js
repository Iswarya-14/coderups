const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');  // ✅ added for email
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ parse JSON body for form data
app.use(express.static(path.join(__dirname, 'public')));

// --- Google Reviews Config ---
const API_KEY = 'AIzaSyDtMqQc1fm5QXqkZFMyQ69WD3BIoo7Hipo';
const PLACE_ID = 'ChIJs5ydyTiuEmsR0fRSlU0C7k0';

// Serve the reviews HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'reviews.html'));
});

// --- Google Reviews API endpoint ---
app.get('/api/reviews', async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
    const response = await axios.get(url);
    const reviews = response.data.result.reviews;
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// --- NEW: Enquiry Email Endpoint ---
app.post('/send', async (req, res) => {
  const { name, email, phone, city, course, specialization } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iswaryagvsi99@gmail.com",   // ✅ replace with your Gmail
        pass: "lvlf ehwe psac iylq"       // ✅ use Gmail App Password
      }
    });

    let mailOptions = {
      from: `"Coderups Enquiry" <your-email@gmail.com>`,
      to: "iswaryagvsi99@gmail.com", // ✅ where you want to receive enquiries
      subject: "New Enquiry from Coderups",
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        City: ${city}
        Course: ${course}
        Specialization: ${specialization}
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Enquiry sent successfully!" });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).send({ error: "Failed to send enquiry" });
  }
});

// --- Start server ---
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
