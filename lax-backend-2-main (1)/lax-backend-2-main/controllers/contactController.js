import Contact from "../model/contactModel.js";
import { sendContactEmail } from "../utils/sendContactEmail.js";
import { saveContactToSheet } from "../utils/googleSheets.js";

export const createContact = async (req, res) => {
  try {
    const { Name, email, phone, service, message } = req.body;

    if (!Name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Message are required",
      });
    }

    const newContact = new Contact({
      Name,
      email,
      phone,
      service,
      message,
    });

    console.log("Saving Contact to MongoDB...");
    // Save to MongoDB
    await newContact.save();
    console.log("Contact saved to MongoDB.");

    // Return response quickly
    res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
      data: newContact,
    });

    // Run third-party tasks in background
    console.log("Initiating Google Sheets and Email...");
    
    saveContactToSheet(newContact)
      .then(() => console.log("Success: Saved to Google Sheets"))
      .catch(err => console.error("Error: Failed to save to Google Sheets:", err.message));

    sendContactEmail({ Name, email, phone, service, message })
      .then(() => console.log("Success: Sent Email Notification"))
      .catch(err => console.error("Error: Failed to send email:", err.message));

  } catch (error) {
    console.error("Create Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
