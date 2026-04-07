import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendCareerEmail = async (data) => {
  try {
    const brevoKey = process.env.BREVO_API_KEY;
    const apiUrl = "https://api.brevo.com/v3/smtp/email";
    
    const headers = {
      "api-key": brevoKey,
      "Content-Type": "application/json",
    };

    // 1️⃣ HR Notification Payload
    const hrPayload = {
      sender: { email: process.env.PASS_EMAIL, name: "LAX360 Careers" },
      to: [{ email: process.env.HR_EMAIL || "lax360hr@gmail.com" }],
      replyTo: { email: data.email },
      subject: "New Job Application - LAX360",
      htmlContent: `
<div style="font-family: Arial; background:#f4f4f4; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:6px; overflow:hidden;">
    <div style="background:#667eea; color:white; padding:20px; text-align:center;">
      <h2>📧 New Job Application Received</h2>
    </div>
    <div style="padding:20px;">
      <p><strong>First Name:</strong> ${data.firstName}</p>
      <p><strong>Last Name:</strong> ${data.lastName || "Not provided"}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Job Title:</strong> ${data.jobTitle}</p>
      <a href="${data.resume}" target="_blank" style="padding:10px 20px; background:#667eea; color:white; text-decoration:none; border-radius:5px;">📄 Open Resume</a>
    </div>
  </div>
</div>`,
    };

    // 2️⃣ Applicant Auto-reply Payload
    const autoReplyPayload = {
      sender: { email: process.env.PASS_EMAIL, name: "LAX360" },
      to: [{ email: data.email }],
      subject: "Application Received - LAX360",
      htmlContent: `
<div style="font-family:Arial; padding:20px">
  <h2>Thank you for applying at LAX360</h2>
  <p>Hi ${data.firstName},</p>
  <p>We have received your application for the <strong>${data.jobTitle}</strong> position.</p>
  <p>Our HR team will review your profile shortly.</p>
  <p>Regards,<br>LAX360 Hiring Team</p>
</div>`,
    };

    // We use Promise.all to fetch both concurrently to prevent timeout chaining delays
    await Promise.all([
      axios.post(apiUrl, hrPayload, { headers, timeout: 15000 }).then(() => console.log("✅ Career HR notification sent")),
      axios.post(apiUrl, autoReplyPayload, { headers, timeout: 15000 }).then(() => console.log("✅ Career auto-reply sent to:", data.email))
    ]);

  } catch (error) {
    if (error.response) {
      console.error("❌ Career email failed (API Response):", error.response.data);
    } else {
      console.error("❌ Career email failed (Network/Timeout):", error.message);
    }
  }
};