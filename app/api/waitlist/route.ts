import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, interest, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !interest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Bot verification required' },
        { status: 400 }
      );
    }

    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      console.error('Turnstile verification failed:', turnstileData);
      return NextResponse.json(
        { error: 'Bot verification failed' },
        { status: 403 }
      );
    }

    // Create transporter with Fabstir's SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format the email
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long',
    });

    const interestLabels: Record<string, string> = {
      user: 'User',
      developer: 'Developer',
      'gpu-provider': 'GPU Provider',
    };
    const interestLabel = interestLabels[interest as string] || interest;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Platformless AI Waitlist Submission',
      text: `
New Waitlist Submission
=======================

Name: ${name}
Email: ${email}
Interest: ${interestLabel}
Submitted: ${timestamp}

---
This submission was automatically sent from the Platformless AI waitlist form.
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #6b7280; }
    .value { color: #1f2937; font-size: 16px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Waitlist Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Interest:</div>
        <div class="value">${interestLabel}</div>
      </div>
      <div class="field">
        <div class="label">Submitted:</div>
        <div class="value">${timestamp}</div>
      </div>
      <div class="footer">
        This submission was automatically sent from the Platformless AI waitlist form.
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Waitlist submission received' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process waitlist submission' },
      { status: 500 }
    );
  }
}
