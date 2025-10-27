import nodemailer from 'nodemailer';
// Email configuration
const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'j4pwdsno.reply@gmail.com',
        pass: process.env.SMTP_PASS || 'cvox wkzx tnxz ajod',
    },
};
// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport(emailConfig);
};
// Email templates
const getVerificationEmailTemplate = (userName, verificationUrl) => ({
    subject: 'Verify Your J4PWDs Account',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your J4PWDs Account</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">J4PWDs</div>
          <h1>Welcome to J4PWDs!</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>Thank you for creating your account with J4PWDs! To complete your registration and start accessing personalized opportunities, please verify your email address.</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
          
          <p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>
          
          <p>If you didn't create an account with J4PWDs, you can safely ignore this email.</p>
          
          <p>Best regards,<br>The J4PWDs Team</p>
        </div>
        <div class="footer">
          <p>This email was sent to you because you registered for a J4PWDs account.</p>
          <p>If you have any questions, please contact us at support@J4PWDs.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
    text: `
    Welcome to J4PWDs!
    
    Hi ${userName},
    
    Thank you for creating your account with J4PWDs! To complete your registration and start accessing personalized opportunities, please verify your email address.
    
    Click the following link to verify your email:
    ${verificationUrl}
    
    This verification link will expire in 24 hours for security reasons.
    
    If you didn't create an account with J4PWDs, you can safely ignore this email.
    
    Best regards,
    The J4PWDs Team
    
    ---
    This email was sent to you because you registered for a J4PWDs account.
    If you have any questions, please contact us at support@J4PWDs.com
  `
});
const getPasswordResetEmailTemplate = (userName, resetUrl) => ({
    subject: 'J4PWDs - Password Reset Request',
    html: `
    <html>
    <body>
      <h2>Password Reset Request</h2>
      <p>Hi ${userName},</p>
      <p>You requested a password reset for your J4PWDs account.</p>
      <p>
        <a href="${resetUrl}" style="background:#667eea;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a>
      </p>
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break:break-all;color:#667eea;">${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Best regards,<br>The J4PWDs Team</p>
    </body>
    </html>
  `,
    text: `
    Password Reset Request

    Hi ${userName},

    You requested a password reset for your J4PWDs account.

    Reset your password using this link:
    ${resetUrl}

    This link will expire in 1 hour.

    If you didn't request this, you can ignore this email.

    Best regards,
    The J4PWDs Team
  `
});
const getPasswordResetConfirmationTemplate = (userName) => ({
    subject: 'J4PWDs - Password Changed Successfully',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Changed - J4PWDs</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .success-icon { font-size: 48px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">J4PWDs</div>
          <h1>Password Changed Successfully</h1>
        </div>
        <div class="content" style="text-align: center;">
          <div class="success-icon">✅</div>
          <h2>Hi ${userName},</h2>
          <p>Your password has been successfully changed.</p>
          <p>If you didn't make this change, please contact our support team immediately.</p>
          
          <p style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 5px;">
            <strong>Security Tip:</strong> Use a strong, unique password and enable two-factor authentication for added security.
          </p>
          
          <p>Best regards,<br>The J4PWDs Team</p>
        </div>
        <div class="footer">
          <p>This email was sent to confirm your password change.</p>
          <p>If you have any questions, please contact us at support@J4PWDs.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
    text: `
    Password Changed Successfully - J4PWDs
    
    Hi ${userName},
    
    Your password has been successfully changed.
    
    If you didn't make this change, please contact our support team immediately.
    
    Security Tip: Use a strong, unique password and enable two-factor authentication for added security.
    
    Best regards,
    The J4PWDs Team
    
    ---
    This email was sent to confirm your password change.
    If you have any questions, please contact us at support@J4PWDs.com
  `
});
const getResendVerificationEmailTemplate = (userName, verificationUrl) => ({
    subject: 'J4PWDs - New Verification Email',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Verification Email - J4PWDs</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">J4PWDs</div>
          <h1>New Verification Email</h1>
        </div>
        <div class="content">
          <h2>Hi ${userName},</h2>
          <p>You requested a new verification email for your J4PWDs account. Here's your new verification link:</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
          
          <p><strong>Important:</strong> This verification link will expire in 24 hours for security reasons.</p>
          
          <p>If you didn't request this email, please contact our support team immediately.</p>
          
          <p>Best regards,<br>The J4PWDs Team</p>
        </div>
        <div class="footer">
          <p>This email was sent to you because you requested a new verification email.</p>
          <p>If you have any questions, please contact us at support@J4PWDs.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
    text: `
    New Verification Email - J4PWDs
    
    Hi ${userName},
    
    You requested a new verification email for your J4PWDs account. Here's your new verification link:
    
    ${verificationUrl}
    
    This verification link will expire in 24 hours for security reasons.
    
    If you didn't request this email, please contact our support team immediately.
    
    Best regards,
    The J4PWDs Team
    
    ---
    This email was sent to you because you requested a new verification email.
    If you have any questions, please contact us at support@J4PWDs.com
  `
});
// NEW: Approval email template for employer accounts
const getApprovalEmailTemplate = (userName, loginUrl) => ({
    subject: 'Your Employer Account Has Been Approved! 🎉',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Approved - J4PWDs</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
        .info-box { background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .success-icon { font-size: 48px; margin-bottom: 20px; }
        ul { text-align: left; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">J4PWDs</div>
          <div class="success-icon">🎉</div>
          <h1>Account Approved!</h1>
        </div>
        <div class="content">
          <p>Hello ${userName},</p>
          
          <p>Great news! Your employer account on <strong>J4PWDs</strong> has been approved by our administrators.</p>
          
          <div class="info-box">
            <strong>✅ Your account is now fully active!</strong>
            <p style="margin: 10px 0 0 0;">You can now log in and start posting job opportunities, connecting with talented professionals, and building your inclusive workforce.</p>
          </div>

          <p><strong>What you can do now:</strong></p>
          <ul>
            <li>Post job listings for diverse candidates</li>
            <li>Browse qualified job seekers</li>
            <li>Manage applications and communicate with applicants</li>
            <li>Customize your company profile</li>
          </ul>

          <div style="text-align: center;">
            <a href="${loginUrl}" class="button">Log In to Your Account</a>
          </div>

          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #667eea;">${loginUrl}</p>

          <p>If you have any questions or need assistance getting started, our support team is here to help!</p>

          <p>Welcome to the J4PWDs community!</p>
          
          <p>Best regards,<br>
          <strong>The J4PWDs Team</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>If you have any questions, please contact us at support@J4PWDs.com</p>
          <p>&copy; ${new Date().getFullYear()} J4PWDs. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
    text: `
    Account Approved! - J4PWDs
    
    Hello ${userName},

    Great news! Your employer account on J4PWDs has been approved by our administrators.

    ✅ Your account is now fully active!
    
    You can now log in and start posting job opportunities, connecting with talented professionals, and building your inclusive workforce.

    What you can do now:
    - Post job listings for diverse candidates
    - Browse qualified job seekers
    - Manage applications and communicate with applicants
    - Customize your company profile

    Log in to your account: ${loginUrl}

    If you have any questions or need assistance getting started, our support team is here to help!

    Welcome to the J4PWDs community!

    Best regards,
    The J4PWDs Team
    
    ---
    This is an automated message. Please do not reply to this email.
    If you have any questions, please contact us at support@J4PWDs.com
    © ${new Date().getFullYear()} J4PWDs. All rights reserved.
  `
});
// Email service class
export class EmailService {
    transporter;
    constructor() {
        this.transporter = createTransporter();
    }
    // Send password reset email
    async sendPasswordResetEmail(userEmail, userName, resetToken) {
        try {
            const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
            const emailTemplate = getPasswordResetEmailTemplate(userName, resetUrl);
            const mailOptions = {
                from: `"J4PWDs" <${emailConfig.auth.user}>`,
                to: userEmail,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Password reset email sent successfully:', result.messageId);
            return true;
        }
        catch (error) {
            console.error('Failed to send password reset email:', error);
            return false;
        }
    }
    // Send password reset confirmation email
    async sendPasswordResetConfirmation(userEmail, userName) {
        try {
            const emailTemplate = getPasswordResetConfirmationTemplate(userName);
            const mailOptions = {
                from: `"J4PWDs" <${emailConfig.auth.user}>`,
                to: userEmail,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Password reset confirmation email sent successfully:', result.messageId);
            return true;
        }
        catch (error) {
            console.error('Failed to send password reset confirmation email:', error);
            return false;
        }
    }
    // Send verification email
    async sendVerificationEmail(userEmail, userName, verificationToken) {
        try {
            const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
            const emailTemplate = getVerificationEmailTemplate(userName, verificationUrl);
            const mailOptions = {
                from: `"J4PWDs" <${emailConfig.auth.user}>`,
                to: userEmail,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Verification email sent successfully:', result.messageId);
            return true;
        }
        catch (error) {
            console.error('Failed to send verification email:', error);
            return false;
        }
    }
    // Send resend verification email
    async sendResendVerificationEmail(userEmail, userName, verificationToken) {
        try {
            const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
            const emailTemplate = getResendVerificationEmailTemplate(userName, verificationUrl);
            const mailOptions = {
                from: `"J4PWDs" <${emailConfig.auth.user}>`,
                to: userEmail,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Resend verification email sent successfully:', result.messageId);
            return true;
        }
        catch (error) {
            console.error('Failed to send resend verification email:', error);
            return false;
        }
    }
    // NEW: Send approval email for employer accounts
    async sendApprovalEmail(userEmail, userName) {
        try {
            const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const loginUrl = `${baseUrl}/login`;
            const emailTemplate = getApprovalEmailTemplate(userName, loginUrl);
            const mailOptions = {
                from: `"J4PWDs" <${emailConfig.auth.user}>`,
                to: userEmail,
                subject: emailTemplate.subject,
                html: emailTemplate.html,
                text: emailTemplate.text,
            };
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Approval email sent successfully:', result.messageId);
            return true;
        }
        catch (error) {
            console.error('Failed to send approval email:', error);
            return false;
        }
    }
    // Test email configuration
    async testConnection() {
        try {
            await this.transporter.verify();
            console.log('Email service connection verified successfully');
            return true;
        }
        catch (error) {
            console.error('Email service connection failed:', error);
            return false;
        }
    }
    // Generic email sending method (for the sendEmail function in controller)
    async sendMail(mailOptions) {
        return await this.transporter.sendMail(mailOptions);
    }
}
// Create singleton instance
export const emailService = new EmailService();
// Development fallback - log email instead of sending
export const sendDevelopmentEmail = (to, subject, html, text) => {
    console.log('\n=== DEVELOPMENT EMAIL ===');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('HTML Content:', html);
    console.log('Text Content:', text);
    console.log('=== END EMAIL ===\n');
};
