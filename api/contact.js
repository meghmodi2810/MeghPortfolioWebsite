import nodemailer from 'nodemailer';

const REQUIRED_ENV_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO'];

function missingEnvKeys() {
    return REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function getPayload(req) {
    if (!req.body) {
        return {};
    }

    if (typeof req.body === 'string') {
        return JSON.parse(req.body);
    }

    return req.body;
}

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Allow', 'POST, OPTIONS');
        res.status(204).end();
        return;
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST, OPTIONS');
        res.status(405).json({ error: 'Method not allowed.' });
        return;
    }

    const missing = missingEnvKeys();
    if (missing.length > 0) {
        console.error('Missing required environment variables:', missing.join(', '));
        res.status(500).json({ error: 'Mailer is not configured on the server.' });
        return;
    }

    let payload;
    try {
        payload = getPayload(req);
    } catch {
        res.status(400).json({ error: 'Invalid JSON payload.' });
        return;
    }

    const name = String(payload.name || '').trim();
    const email = String(payload.email || '').trim();
    const message = String(payload.message || '').trim();

    if (!name || !email || !message) {
        res.status(400).json({ error: 'All fields are required.' });
        return;
    }

    if (name.length > 120 || message.length > 5000) {
        res.status(400).json({ error: 'Please keep your message concise.' });
        return;
    }

    if (!isValidEmail(email)) {
        res.status(400).json({ error: 'Please provide a valid email address.' });
        return;
    }

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

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>');

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || `Portfolio Contact <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_TO,
            replyTo: email,
            subject: `New portfolio message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<h2>New Portfolio Contact</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br/>${safeMessage}</p>`
        });

        res.status(200).json({ ok: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Failed to send contact email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
}
