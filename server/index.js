import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const defaultOrigins = 'http://localhost:5173,http://127.0.0.1:5173';
const allowedOrigins = (process.env.CLIENT_ORIGINS || defaultOrigins)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
const localhostOriginPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

const smtpPort = Number(process.env.SMTP_PORT || 587);
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const requiredEnvKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO'];

function missingEnvKeys() {
    return requiredEnvKeys.filter((key) => !process.env[key]);
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.use(
    cors({
        origin(origin, callback) {
            if (
                !origin ||
                allowedOrigins.includes(origin) ||
                localhostOriginPattern.test(origin)
            ) {
                callback(null, true);
                return;
            }

            callback(new Error(`CORS blocked origin: ${origin}`));
        }
    })
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
    const { name = '', email = '', message = '' } = req.body || {};

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedMessage = String(message).trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        res.status(400).json({ error: 'All fields are required.' });
        return;
    }

    if (trimmedName.length > 120 || trimmedMessage.length > 5000) {
        res.status(400).json({ error: 'Please keep your message concise.' });
        return;
    }

    if (!isValidEmail(trimmedEmail)) {
        res.status(400).json({ error: 'Please provide a valid email address.' });
        return;
    }

    const missing = missingEnvKeys();
    if (missing.length > 0) {
        console.error('Missing required environment variables:', missing.join(', '));
        res.status(500).json({ error: 'Mailer is not configured on the server.' });
        return;
    }

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replaceAll('\n', '<br/>');

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || `Portfolio Contact <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_TO,
            replyTo: trimmedEmail,
            subject: `New portfolio message from ${trimmedName}`,
            text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
            html: `<h2>New Portfolio Contact</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br/>${safeMessage}</p>`
        });

        res.json({ ok: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Failed to send contact email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

app.use((error, _req, res, next) => {
    void next;

    if (error?.message?.startsWith('CORS blocked origin:')) {
        res.status(403).json({ error: 'This origin is not allowed.' });
        return;
    }

    console.error('Unhandled server error:', error);
    res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(port, () => {
    console.log(`Mailer API running at http://localhost:${port}`);
});
