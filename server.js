const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mayankpandey.onrender.com'
  ]
}));
app.use(express.json());

// Twilio configuration (optional)
let twilioClient = null;
if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_SID.startsWith('AC') && process.env.TWILIO_AUTH_TOKEN.length > 10) {
  const twilio = require('twilio');
  twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  console.log('Twilio SMS enabled');
} else {
  console.log('Twilio SMS disabled - using email only');
}

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'mp04042007@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from your portfolio website</em></p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Send SMS (only if Twilio is configured)
    if (twilioClient && process.env.TWILIO_PHONE && process.env.YOUR_PHONE) {
      try {
        const smsMessage = `New Portfolio Contact!\nName: ${name}\nEmail: ${email}\nMessage: ${message.substring(0, 100)}...`;
        
        await twilioClient.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE,
          to: process.env.YOUR_PHONE
        });
      } catch (smsError) {
        console.log('SMS failed (optional):', smsError.message);
      }
    }

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});