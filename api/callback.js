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

  const data = await response.json();
  
  // Log to Vercel logs
  console.log("ACCESS TOKEN:", data.access_token);
  console.log("FULL RESPONSE:", JSON.stringify(data));

  return res.status(200).send(`
    <h2>Token Exchange Complete</h2>
    <p>Check Vercel logs for your token</p>
    <pre>${JSON.stringify(data, null, 2)}</pre>
  `);
};
