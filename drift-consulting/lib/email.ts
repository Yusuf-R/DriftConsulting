// lib/email.ts
import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('Email transporter error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

interface ContactEmailData {
    name: string;
    email: string;
    projectType: string;
    location: string;
    scope: string;
    phone?: string;
    budget?: string;
    timeline?: string;
}

// Send OTP Email for Password Reset
export async function sendOTPEmail(email: string, otp: string, name?: string) {
    const mailOptions = {
        from: `"Drift Consulting" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Password Reset OTP - Drift Consulting',
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1F4788 0%, #2E5C8A 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .content p {
            font-size: 16px;
            color: #1e293b;
            margin-bottom: 15px;
        }
        .otp-box {
            background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
            border: 2px solid #1F4788;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-label {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .otp-code {
            font-size: 48px;
            font-weight: bold;
            color: #1F4788;
            letter-spacing: 12px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .otp-expiry {
            font-size: 13px;
            color: #64748b;
            margin-top: 10px;
        }
        .warning {
            background: #FEF3C7;
            border-left: 4px solid #F59E0B;
            padding: 16px;
            margin: 25px 0;
            border-radius: 6px;
        }
        .warning p {
            margin: 0;
            font-size: 14px;
            color: #92400E;
        }
        .warning strong {
            color: #78350F;
        }
        .security-tips {
            background: #F1F5F9;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
        }
        .security-tips h3 {
            margin: 0 0 15px 0;
            font-size: 16px;
            color: #1e293b;
        }
        .security-tips ul {
            margin: 0;
            padding-left: 20px;
        }
        .security-tips li {
            font-size: 14px;
            color: #475569;
            margin-bottom: 8px;
        }
        .footer {
            text-align: center;
            padding: 30px;
            color: #64748b;
            font-size: 13px;
            background: #F8FAFC;
        }
        .footer p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Password Reset Request</h1>
        </div>
        
        <div class="content">
            <p>Hello ${name || 'there'},</p>
            
            <p>We received a request to reset your password for your Drift Consulting admin account. Use the OTP code below to complete the process:</p>
            
            <div class="otp-box">
                <div class="otp-label">Your One-Time Password</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-expiry">⏱️ Valid for 3 minutes only</div>
            </div>
            
            <div class="warning">
                <p><strong>⚠️ Security Alert:</strong></p>
                <p>If you didn't request this password reset, please ignore this email and ensure your account is secure. Your password will not be changed unless you complete the reset process.</p>
            </div>
            
            <div class="security-tips">
                <h3>🛡️ Security Tips</h3>
                <ul>
                    <li>Never share this OTP with anyone</li>
                    <li>Our team will never ask for your OTP</li>
                    <li>This code expires in 3 minutes</li>
                    <li>Use a strong, unique password</li>
                </ul>
            </div>
            
            <p>If you have any questions or concerns, please contact our support team.</p>
            
            <p style="margin-top: 30px;">
                <strong>Best regards,</strong><br>
                Drift Consulting Security Team
            </p>
        </div>

        <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
            <p>© ${new Date().getFullYear()} Drift Consulting. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('OTP email send error:', error);
        return { success: false, error };
    }
}

// Send Contact Notification to Admin
export async function sendContactNotification(data: ContactEmailData) {
    const projectTypeLabels: Record<string, string> = {
        residential: 'Residential',
        hospitality: 'Hospitality',
        institutional: 'Institutional',
        commercial: 'Commercial',
        government: 'Government',
    };

    const emailHtml = `
<!DOCTYPE html>
<html  lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8fafc;
    }
    .container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .badge {
      display: inline-block;
      background: #f59e0b;
      color: #1e293b;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      margin-top: 10px;
    }
    .content {
      padding: 30px;
    }
    .field {
      margin-bottom: 20px;
      background: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
    }
    .field-label {
      font-weight: 600;
      color: #64748b;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    .field-value {
      color: #1e293b;
      font-size: 16px;
    }
    .field-value a {
      color: #f59e0b;
      text-decoration: none;
    }
    .field-value a:hover {
      text-decoration: underline;
    }
    .scope-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 2px solid #e2e8f0;
      margin-top: 10px;
      line-height: 1.8;
    }
    .footer {
      text-align: center;
      padding: 25px;
      border-top: 2px solid #e2e8f0;
      color: #64748b;
      font-size: 13px;
      background: #f8fafc;
    }
    .cta-button {
      display: inline-block;
      background: #f59e0b;
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 20px;
      transition: background 0.3s;
    }
    .cta-button:hover {
      background: #d97706;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏗️ New Project Inquiry</h1>
      <span class="badge">${projectTypeLabels[data.projectType] || data.projectType}</span>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="field-label">Contact Name</div>
        <div class="field-value">${data.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">
          <a href="mailto:${data.email}">${data.email}</a>
        </div>
      </div>

      ${data.phone ? `
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">
          <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      </div>
      ` : ''}

      <div class="field">
        <div class="field-label">Project Location</div>
        <div class="field-value">${data.location}</div>
      </div>

      ${data.budget ? `
      <div class="field">
        <div class="field-label">Budget Range</div>
        <div class="field-value">${data.budget}</div>
      </div>
      ` : ''}

      ${data.timeline ? `
      <div class="field">
        <div class="field-label">Expected Timeline</div>
        <div class="field-value">${data.timeline}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="field-label">Project Scope & Requirements</div>
        <div class="scope-box">${data.scope.replace(/\n/g, '<br>')}</div>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${data.email}" class="cta-button">Reply to Inquiry</a>
      </div>
    </div>

    <div class="footer">
      <p><strong>Inquiry received from portfolio website</strong></p>
      <p>${new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
        from: `"Drift Consulting - Contact Form" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: data.email,
        subject: `🏗️ New ${projectTypeLabels[data.projectType]} Project Inquiry from ${data.name}`,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Contact notification email send error:', error);
        return { success: false, error };
    }
}

// Send Auto-reply to Client
export async function sendClientConfirmation(email: string, name: string) {
    const emailHtml = `
<!DOCTYPE html>
<html  lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f8fafc;
    }
    .container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .content p {
      font-size: 16px;
      color: #1e293b;
      margin-bottom: 15px;
      line-height: 1.8;
    }
    .highlight {
      background: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%);
      padding: 25px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
      margin: 25px 0;
    }
    .highlight strong {
      color: #1F4788;
      font-size: 17px;
    }
    .highlight ul {
      margin: 15px 0 0 0;
      padding-left: 20px;
    }
    .highlight li {
      margin: 8px 0;
      color: #334155;
    }
    .footer {
      text-align: center;
      padding: 25px;
      color: #64748b;
      font-size: 13px;
      background: #f8fafc;
      border-top: 2px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ We've Received Your Inquiry</h1>
    </div>
    
    <div class="content">
      <p>Dear ${name},</p>
      
      <p>Thank you for your interest in Drift Consulting's construction project management services. We have successfully received your project inquiry and appreciate you taking the time to provide detailed information about your requirements.</p>
      
      <div class="highlight">
        <strong>📋 What happens next?</strong>
        <ul>
          <li><strong>Review:</strong> Our team will carefully assess your project requirements</li>
          <li><strong>Response:</strong> We'll get back to you within 24 hours</li>
          <li><strong>Consultation:</strong> Schedule a detailed discussion about your project</li>
          <li><strong>Proposal:</strong> Receive a customized project plan and quote</li>
        </ul>
      </div>
      
      <p>In the meantime, if you have any urgent questions or additional information to share, please feel free to reply to this email or contact us directly.</p>
      
      <p>We look forward to the opportunity to work with you on your project!</p>
      
      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <strong>Best regards,</strong><br>
        The Drift Consulting Team<br>
        <span style="color: #64748b; font-size: 14px;">Construction Project Management Excellence</span>
      </p>
    </div>

    <div class="footer">
      <p><strong>Drift Consulting</strong></p>
      <p>This is an automated confirmation email.</p>
      <p>© ${new Date().getFullYear()} Drift Consulting. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
        from: `"Drift Consulting" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: '✅ Your Project Inquiry Has Been Received - Drift Consulting',
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Client confirmation email error:', error);
        return { success: false, error };
    }
}