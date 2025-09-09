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

const getVerificationEmailTemplate = (userName: string, verificationUrl: string) => ({
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

const getPasswordResetEmailTemplate = (userName: string, resetUrl: string) => ({
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



const getResendVerificationEmailTemplate = (userName: string, verificationUrl: string) => ({
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

// Email service class
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = createTransporter();
  }

  // Add this method inside your EmailService class:
async sendPasswordResetEmail(userEmail: string, userName: string, resetToken: string): Promise<boolean> {
  try {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
    const emailTemplate = getPasswordResetEmailTemplate(userName, resetUrl);

    const mailOptions = {
      from: `"J4IPWDs" <${emailConfig.auth.user}>`,
      to: userEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    const result = await this.transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return false;
  }
}

  // Send verification email
  async sendVerificationEmail(userEmail: string, userName: string, verificationToken: string): Promise<boolean> {
    try {
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
      
      const emailTemplate = getVerificationEmailTemplate(userName, verificationUrl);
      
      const mailOptions = {
        from: `"J4IPWDs" <${emailConfig.auth.user}>`,
        to: userEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return false;
    }
  }

  // Send resend verification email
  async sendResendVerificationEmail(userEmail: string, userName: string, verificationToken: string): Promise<boolean> {
    try {
      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;
      
      const emailTemplate = getResendVerificationEmailTemplate(userName, verificationUrl);
      
      const mailOptions = {
        from: `"J4IPWDs" <${emailConfig.auth.user}>`,
        to: userEmail,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Resend verification email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Failed to send resend verification email:', error);
      return false;
    }
  }

  // Test email configuration
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const emailService = new EmailService();

// Development fallback - log email instead of sending
export const sendDevelopmentEmail = (to: string, subject: string, html: string, text: string) => {
  console.log('\n=== DEVELOPMENT EMAIL ===');
  console.log('To:', to);
  console.log('Subject:', subject);
  console.log('HTML Content:', html);
  console.log('Text Content:', text);
  console.log('=== END EMAIL ===\n');
}; 
