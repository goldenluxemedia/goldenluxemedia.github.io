// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000; // Backend will run on port 3000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider (e.g., 'hotmail', 'yahoo')
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    // For development with self-signed certificates or less secure connections (not for production with some providers)
    // tls: {
    //     rejectUnauthorized: false
    // }
});

// Verify Nodemailer configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Nodemailer config error:', error);
        // Consider more robust error handling or exiting if email is critical
    } else {
        console.log('Nodemailer is ready to send emails');
    }
});

// Route to handle form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, company_website, service, message } = req.body;

    console.log('Received form data:', req.body); // Log received data

    // Basic validation (you can make this more robust)
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, Email, and Message are required.' });
    }

    // Email options
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (appears as your email, but is sent FROM your email)
        replyTo: email, // Important: So you can reply directly to the user's email
        to: process.env.RECIPIENT_EMAIL, // List of receivers (your email address)
        subject: `New Contact Form Submission from ${name} - Golden Luxe Media`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company & Website:</strong> ${company_website || 'Not provided'}</p>
            <p><strong>Primary Interest:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // Send a more user-friendly error message
            return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later or contact us directly.' });
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
    });
});

// Test route to ensure the server is up
app.get('/', (req, res) => {
    res.send('Golden Luxe Media Backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
