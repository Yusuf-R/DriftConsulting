// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Drift Consulting <noreply@yourdomain.com>',
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
        });

        if (error) {
            console.error('OTP email send error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('OTP email service error:', error);
        return { success: false, error };
    }
}

// Send Contact Notification to Admin
export async function sendContactNotification(data: ContactEmailData) {
    try {
        const projectTypeLabels: Record<string, string> = {
            residential: 'Residential',
            hospitality: 'Hospitality',
            institutional: 'Institutional',
            commercial: 'Commercial',
            government: 'Government',
        };

        const emailHtml = `
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
    }
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
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
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 10px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #f59e0b;
    }
    .field-label {
      font-weight: 600;
      color: #64748b;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .field-value {
      color: #1e293b;
      font-size: 16px;
    }
    .scope-box {
      background: white;
      padding: 20px;
      border-radius: 6px;
      border: 2px solid #e2e8f0;
      margin-top: 10px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      color: #64748b;
      font-size: 14px;
    }
    .cta-button {
      display: inline-block;
      background: #f59e0b;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin-top: 20px;
    }
  </style>
</head>
<body>
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
        <a href="mailto:${data.email}" style="color: #f59e0b; text-decoration: none;">${data.email}</a>
      </div>
    </div>

    ${data.phone ? `
    <div class="field">
      <div class="field-label">Phone Number</div>
      <div class="field-value">
        <a href="tel:${data.phone}" style="color: #f59e0b; text-decoration: none;">${data.phone}</a>
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
    <p>This inquiry was submitted through your portfolio website.</p>
    <p style="font-size: 12px; color: #94a3b8;">
      Received on ${new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
    </p>
  </div>
</body>
</html>
        `;

        const { data: emailData, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Drift Consulting <noreply@yourdomain.com>',
            to: process.env.EMAIL_TO || 'admin@yourdomain.com',
            subject: `🏗️ New ${projectTypeLabels[data.projectType]} Project Inquiry from ${data.name}`,
            html: emailHtml,
            replyTo: data.email,
        });

        if (error) {
            console.error('Contact notification email send error:', error);
            return { success: false, error };
        }

        return { success: true, data: emailData };
    } catch (error) {
        console.error('Contact notification email service error:', error);
        return { success: false, error };
    }
}

// Auto-reply to Client
export async function sendClientConfirmation(email: string, name: string) {
    try {
        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
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
    }
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 40px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background: #f8fafc;
      padding: 40px;
      border-radius: 0 0 8px 8px;
    }
    .content p {
      font-size: 16px;
      color: #1e293b;
      margin-bottom: 15px;
    }
    .highlight {
      background: white;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #f59e0b;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ We've Received Your Inquiry</h1>
  </div>
  
  <div class="content">
    <p>Dear ${name},</p>
    
    <p>Thank you for your interest in our construction project management services. We have successfully received your project inquiry and appreciate you taking the time to provide detailed information.</p>
    
    <div class="highlight">
      <strong>What happens next?</strong><br><br>
      Our team will carefully review your project requirements and get back to you within 24 hours with:<br>
      • Initial project assessment<br>
      • Next steps for consultation<br>
      • Any additional information we may need
    </div>
    
    <p>In the meantime, if you have any urgent questions or additional information to share, please feel free to reply to this email.</p>
    
    <p>We look forward to discussing your project with you.</p>
    
    <p style="margin-top: 30px;">
      <strong>Best regards,</strong><br>
      Drift Consulting Team
    </p>
  </div>

  <div class="footer">
    <p>This is an automated confirmation. Please do not reply to this email.</p>
  </div>
</body>
</html>
        `;

        const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Drift Consulting <noreply@yourdomain.com>',
            to: email,
            subject: 'Your Project Inquiry Has Been Received',
            html: emailHtml,
        });

        if (error) {
            console.error('Client confirmation email send error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Client confirmation email service error:', error);
        return { success: false, error };
    }
}