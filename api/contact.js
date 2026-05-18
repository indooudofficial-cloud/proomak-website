import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { first_name, last_name, email, subject, message } = req.body;

  // Temporary debug logs (remove after testing)
  console.log('ZOHO_USER:', process.env.ZOHO_USER);
  console.log('ZOHO_PASS:', process.env.ZOHO_PASS ? 'Loaded' : 'Missing');

  // Configure transporter with Zoho SMTP
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for port 465
    auth: {
      user: process.env.ZOHO_USER, // info@proomak.com from Vercel env
      pass: process.env.ZOHO_PASS  // H7VVTFWFsahv from Vercel env
    }
  });

  // Define email options
  let mailOptions = {
    from: process.env.ZOHO_USER, // sender (your Zoho account)
    replyTo: email,              // user’s email for reply
    to: 'info@proomak.com',      // recipient (your Zoho inbox)
    subject: subject || `New enquiry from ${first_name} ${last_name}`,
    text: `
      Name: ${first_name} ${last_name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Message sent:', mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ success: false, message: 'Error sending message', error });
  }
}
