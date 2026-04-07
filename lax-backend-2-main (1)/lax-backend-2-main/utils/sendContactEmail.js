import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// ✅ Setup Brevo API
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// ✅ Contact Email Function
export const sendContactEmail = async (data) => {
  try {
    if (!data.Name || !data.email || !data.message) {
      throw new Error("Missing required fields");
    }

    const response = await emailApi.sendTransacEmail({
      sender: {
        email: process.env.PASS_EMAIL,
        name: "LAX360",
      },

      to: [
        {
          email: process.env.CONTACT_EMAIL,
        },
      ],

      replyTo: {
        email: data.email,
      },

      subject: "📩 New Contact Message - LAX360",

      htmlContent: `
<div style="font-family:Arial;padding:20px">
  <h2>New Contact Inquiry</h2>
  <p><b>Name:</b> ${data.Name}</p>
  <p><b>Email:</b> ${data.email}</p>
  <p><b>Phone:</b> ${data.phone || "Not provided"}</p>
  <p><b>Service:</b> ${data.service || "Not specified"}</p>
  <p><b>Message:</b> ${data.message}</p>
</div>
`,
    });

    console.log("✅ Email sent via Brevo", response);
    return { success: true };

  } catch (error) {
    console.error("❌ Brevo error:", error);
    return { success: false, error: error.message };
  }
};