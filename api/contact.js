const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { first_name, last_name, email, subject, message } = req.body || {};

    if (!process.env.ZOHO_USER || !process.env.ZOHO_PASS) {
      return res.status(500).json({
        success: false,
        message: "Missing environment variables"
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.ZOHO_USER,
      replyTo: email,
      to: "info@proomak.com",
      subject: subject || `New enquiry from ${first_name} ${last_name}`,
      text: `
Name: ${first_name} ${last_name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};
