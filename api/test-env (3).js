export default function handler(req, res) {
  // Check if env vars are loaded
  const user = process.env.ZOHO_USER;
  const pass = process.env.ZOHO_PASS;

  if (!user || !pass) {
    return res.status(500).json({
      success: false,
      message: "Environment variables not found",
      user,
      pass
    });
  }

  return res.status(200).json({
    success: true,
    message: "Environment variables loaded successfully",
    user: user,
    pass: pass
  });
}