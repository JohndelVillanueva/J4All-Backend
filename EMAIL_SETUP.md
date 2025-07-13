# Email Verification Setup Guide

## Overview
The J4IPWDs platform now includes email verification for job seeker accounts. This guide will help you set up email sending functionality.

## Prerequisites
1. Install nodemailer: `npm install nodemailer @types/nodemailer`
2. Set up an email account for sending verification emails

## Email Provider Setup

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Add to your .env file**:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   FRONTEND_URL=http://localhost:5173
   ```

### Option 2: Outlook/Hotmail

1. **Enable 2-Factor Authentication** on your Outlook account
2. **Generate an App Password**:
   - Go to Account settings → Security
   - Advanced security options → App passwords
3. **Add to your .env file**:
   ```
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   SMTP_USER=your-email@outlook.com
   SMTP_PASS=your-app-password
   FRONTEND_URL=http://localhost:5173
   ```

### Option 3: Yahoo

1. **Enable 2-Factor Authentication** on your Yahoo account
2. **Generate an App Password**:
   - Go to Account security → App passwords
3. **Add to your .env file**:
   ```
   SMTP_HOST=smtp.mail.yahoo.com
   SMTP_PORT=587
   SMTP_USER=your-email@yahoo.com
   SMTP_PASS=your-app-password
   FRONTEND_URL=http://localhost:5173
   ```

## Environment Variables

Add these to your `.env` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173

# Environment
NODE_ENV=development
```

## Testing Email Configuration

1. **Start the backend server**
2. **Create a new job seeker account**
3. **Check the console logs** for email sending status
4. **In development mode**, verification tokens are also logged to console

## Development Mode

In development mode (`NODE_ENV=development`):
- Verification tokens are logged to console
- Email content is logged if sending fails
- You can copy the verification URL from console logs

## Production Setup

For production:
1. Use a professional email service (SendGrid, Mailgun, etc.)
2. Set `NODE_ENV=production`
3. Ensure `FRONTEND_URL` points to your production domain
4. Remove token logging from console

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**:
   - Check your email and app password
   - Ensure 2FA is enabled
   - Verify SMTP settings

2. **"Connection timeout"**:
   - Check firewall settings
   - Verify SMTP port (587 for TLS, 465 for SSL)

3. **"Authentication failed"**:
   - Use app password, not regular password
   - Ensure 2FA is enabled on your email account

4. **Emails not received**:
   - Check spam folder
   - Verify email address is correct
   - Check console logs for errors

### Testing Without Email:

If you can't set up email immediately, the system will:
1. Create verification tokens
2. Log them to console in development mode
3. Allow manual verification via the verification page

## Security Notes

- Never commit email credentials to version control
- Use environment variables for all sensitive data
- Regularly rotate app passwords
- Monitor email sending logs for suspicious activity 