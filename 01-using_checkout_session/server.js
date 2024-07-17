const express = require("express");

const USERNAME = ""; // Username provided by Nemuru
const PASSWORD = ""; // Password provided by Nemuru
const AGENT_ID = ""; // Agent ID provided by Nemuru
const NEMURU_API_URL = "https://api.stg.nemuru.io/api"; // Nemuru API URL

if (!USERNAME || !PASSWORD) {
  console.error("Please provide a username and password");
  process.exit(1);
}

const app = express();

app.use(express.static("public"));

app.post("/create-checkout-session", async (req, res) => {
  console.log("POST /create-checkout-session");

  // Authenticate with Nemuru API
  const auth = await fetch(`${NEMURU_API_URL}/auth/login/`, {
    method: "POST",
    body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
  });

  // Parse body of the response
  const { access_token } = await auth.json();

  // Use your order reference
  const orderRef = Math.random().toString(36).substring(2);

  // Create a checkout session
  const checkoutSession = await fetch(`${NEMURU_API_URL}/v2/checkout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      agent_id: AGENT_ID,
      merchant: {
        order_reference_1: orderRef,
      },
      cart: {
        reference: orderRef,
        total_price_with_tax: 875,
        currency: "EUR",
        items: [
          {
            article: {
              name: "KIVIK 3-seat sofa",
              type: "product",
              category: "physical",
              reference: "4912345678904",
              unit_price_with_tax: 875,
            },
            units: 1,
            total_price_with_tax: 875,
          },
        ],
      },
      customer: {
        first_name: "Ramon",
        last_name: "Borras Pinilla",
        email: "ramobp@nemuru.com",
        phone_number: "+34666336381",
      },
      ui: {
        mode: "embedded",
        customization: {
          color_text: "#000000",
          color_brand: "#D83334",
          color_border: "#EBEBEB",
          color_background: "#FFFFFF",
          shape: "rounded",
        },
      },
    }),
  });

  // Parse body of the response
  const { checkout_session_id, client_secret } = await checkoutSession.json();

  // Send the response to the client
  res.json({
    checkoutSessionId: checkout_session_id,
    clientSecret: client_secret,
  });
});

app.listen(4000, () => console.log("Running on port 4000"));
