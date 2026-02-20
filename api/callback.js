module.exports = async function handler(req, res) {
  const { code, shop } = req.query;

  if (!code) {
    return res.status(400).send("No code received");
  }

  const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      code: code
    })
  });

  const rawText = await response.text();

  return res.status(200).send(`<pre>${rawText}</pre>`);
};
