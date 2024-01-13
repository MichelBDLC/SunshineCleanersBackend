const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (_, response) => {
    response.status(200).send('Welcome to Sunshine Cleaners');
})

app.get('*', (_, response) => {
    response.status(404).send('Page not found');
})

app.post('/submit-contact-form', async (request, response) => {
    console.log(request.body);
    const {name, email, phone, city, state, zip, serviceInterests, message} = request.body;
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@shinecleaners.co',
            subject: 'New Contact Form Submission',
            html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>City: ${city}</p>
            <p>State: ${state}</p>
            <p>Zip: ${zip}</p>
            <p>Service Interests: ${serviceInterests.join(', ')}</p>
            <p>Message: ${message}</p>`,
        };

        await transporter.sendMail(mailOptions);

        response.status(200).json({message: 'Submitted succesfully'});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({error:'Internal Server Error'});
    }
});

app.post('/submit-cleaner-app', async (request, response) => {
    console.log(request.body);
    const {name, email, phone, city, state, zip, message} = request.body;
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@shinecleaners.co',
            subject: 'New Contact Form Submission',
            html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>City: ${city}</p>
            <p>State: ${state}</p>
            <p>Zip: ${zip}</p>
            <p>Message: ${message}</p>`,
        };

        await transporter.sendMail(mailOptions);

        response.status(200).json({message: 'Submitted succesfully'});
    }
    catch (error) {
        console.error(error);
        response.status(500).json({error:'Internal Server Error'});
    }
});

module.exports = app;