const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'Homebuy@gmail.com',
    pass: process.env.GMAIL_PASSWORD, // Use app-specific password for Gmail
  },
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email transporter ready');
  }
});

// POST route to send contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message',
      });
    }

    // Email content for Homebuy
    const mailOptions = {
      from: process.env.GMAIL_USER || 'Homebuy@gmail.com',
      to: 'Homebuy@gmail.com',
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optional: Send confirmation email to user
    const confirmationEmail = {
      from: process.env.GMAIL_USER || 'Homebuy@gmail.com',
      to: email,
      subject: 'We received your message - Homebuy',
      html: `
        <h2>Thank you for contacting Homebuy</h2>
        <p>Hi ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Your message details:</p>
        <ul>
          <li><strong>Subject:</strong> ${subject || 'No Subject'}</li>
          <li><strong>Sent at:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>Best regards,<br>Homebuy Team</p>
      `,
    };

    await transporter.sendMail(confirmationEmail);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message,
    });
  }
});

module.exports = router;
