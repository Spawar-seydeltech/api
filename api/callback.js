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

    // Get raw text first before trying to parse
    const rawText = await response.text();

    // Show raw response so we can see what Shopify is returning
    return res.status(200).send(`
      <h2>Raw Shopify Response:</h2>
      <pre>${rawText}</pre>
      <h2>Status Code:</h2>
      <p>${response.status}</p>
    `);

  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
};
