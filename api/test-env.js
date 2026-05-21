export default function handler(req, res) {
  try {
    const user = process.env.ZOHO_USER || "Not set";
    const passExists = process.env.ZOHO_PASS ? true : false; // we won't print the password

    res.status(200).json({
      ZOHO_USER: user,
      ZOHO_PASS_set: passExists
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}