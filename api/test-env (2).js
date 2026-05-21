export default function handler(req, res) {
  res.status(200).json({
    ZOHO_USER: process.env.ZOHO_USER || "Not set",
    ZOHO_PASS_set: process.env.ZOHO_PASS ? true : false
  });
}