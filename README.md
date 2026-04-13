# Portfolio Website

Animated portfolio site powered by Vite, with a contact form that sends email notifications.

## Scripts

- `npm run dev`: start the frontend
- `npm run server`: start local Express mailer API (development only)
- `npm run build`: build production assets
- `npm run lint`: run ESLint

## Local Development

1. Create local env file:
   - Copy `.env.example` to `.env`.
2. Fill SMTP values in `.env`:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `CONTACT_TO`
3. Run in two terminals:
   - Terminal 1: `npm run server`
   - Terminal 2: `npm run dev`

The frontend uses `/api/contact` and Vite proxies `/api/*` to `http://localhost:5000` in development.

## Vercel Deployment (No `npm run server` Needed)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. In Vercel Project Settings -> Environment Variables, add:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `CONTACT_TO`
   - `VITE_CONTACT_API_URL=/api/contact`
4. Redeploy.

Production uses serverless routes:
- `POST /api/contact` (mailer)
- `GET /api/health` (health check)

## Notes

- Keep `.env` private. It is ignored by git.
- If you use Gmail SMTP, use an App Password instead of your account password.
