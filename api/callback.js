module.exports = async function handler(req, res) {
  const { code, shop } = req.query;

  if (!code) {
    return res.status(400).send("No code received");
  }

  try {
    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_CLIENT_ID,
        client_secret: process.env.SHOPIFY_CLIENT_SECRET,
        code: code
      })
    });

    const data = await response.json();

    return res.status(200).send(`
      <h2>Your Access Token:</h2>
      <p style="word-break:break-all; font-size:18px; font-weight:bold;">${data.access_token}</p>
      <p>Scope: ${data.scope}</p>
    `);

  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
};
