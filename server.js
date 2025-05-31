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

<<<<<<< HEAD
// Nodemailer transporter setup (using Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider
=======
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your email provider (e.g., 'hotmail', 'yahoo')
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
<<<<<<< HEAD
    // For development with self-signed certificates or less secure connections (not for production)
=======
    // For development with self-signed certificates or less secure connections (not for production with some providers)
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
    // tls: {
    //     rejectUnauthorized: false
    // }
});

<<<<<<< HEAD
transporter.verify((error, success) => {
    if (error) {
        console.error('Nodemailer config error:', error);
=======
// Verify Nodemailer configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Nodemailer config error:', error);
        // Consider more robust error handling or exiting if email is critical
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
    } else {
        console.log('Nodemailer is ready to send emails');
    }
});

<<<<<<< HEAD

=======
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
// Route to handle form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, company_website, service, message } = req.body;

    console.log('Received form data:', req.body); // Log received data

<<<<<<< HEAD
    // Basic validation
=======
    // Basic validation (you can make this more robust)
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, Email, and Message are required.' });
    }

<<<<<<< HEAD
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (appears as your email)
        replyTo: email, // So you can reply directly to the user's email
        to: process.env.RECIPIENT_EMAIL, // List of receivers
=======
    // Email options
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (appears as your email, but is sent FROM your email)
        replyTo: email, // Important: So you can reply directly to the user's email
        to: process.env.RECIPIENT_EMAIL, // List of receivers (your email address)
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
        subject: `New Contact Form Submission from ${name} - Golden Luxe Media`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
<<<<<<< HEAD
            <p><strong>Email:</strong> ${email}</p>
=======
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
            <p><strong>Company & Website:</strong> ${company_website || 'Not provided'}</p>
            <p><strong>Primary Interest:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
    };

<<<<<<< HEAD
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
=======
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // Send a more user-friendly error message
            return res.status(500).json({ success: false, message: 'Failed to send message. Please try again later or contact us directly.' });
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ success: true, message: 'Thank you! Your message has been sent successfully.' });
    });
});

<<<<<<< HEAD
// Test route
=======
// Test route to ensure the server is up
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
app.get('/', (req, res) => {
    res.send('Golden Luxe Media Backend is running!');
});

<<<<<<< HEAD
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
=======
// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
>>>>>>> ae06188 (feat: Implement backend and update frontend for contact form)
