const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

app.post('/send', async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent!', info });
    } catch (error) {
        res.status(500).send({ message: 'Failed to send email.', error });
    }
});

app.get('/', (req, res) => {
    res.send('SMTP Relay Service Running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});