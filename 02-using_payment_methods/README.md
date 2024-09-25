# Display Payment Methods

This example demonstrates how to create a new checkout session using the `paymentMethod` and `paymentIntent` functions. This example uses the Nemuru checkout.js SDK to retrieve the available payment methods (`.paymentMethods`), display each payment method conditions (`.paymentMethod`), and then open an specific payment method process (`.paymentIntent`), once a checkout session has been created.

## Running the sample

1. Build the server

```shell
npm install
```

2. Run the server

```shell
npm run start
```

Make sure to inform the following variables with the values provided by Nemuru:

- `server.js`: set the `USERNAME`, `PASSWORD` and `AGENT_ID`.
- `public/index.html`: set the `AGENT_ID`.

3. Go to [http://localhost:4000](http://localhost:4000)

## Prerequisites

Before you begin, ensure you have the following:

- Nemuru's API credentials (API username and password).
- An active point of sale (agent ID)
- A web server setup to serve your website.

## Step 1: Install Nemuru's checkout.js SDK

First, you need to install the Nemuru checkout.js SDK. You can do this by including the script directly in your HTML file (check the `public/index.html`).

```html
<!-- production -->
<script src="https://pay.nemuru.com/prod/checkout-js/checkout.js"></script>

<!-- staging -->
<script src="https://pay.nemuru.com/stg/checkout-js/checkout.js"></script>
```

## Step 2: Create a Checkout Session

When the customer arrives at the checkout page, you can create a new checkout session, or re-use an existing one, via server-side call.

This example uses the `sessionId` URL parameter to re-open an existing checkout session. You can use this parameter to re-open a checkout session that was previously created.

If no `sessionId` is found within the URL, a new checkout session will be created.

This logic is handled in the `public/index.html` file, within the `initialize` function.

```javascript
const initialize = async () => {
  // Check if checkout session ID exists in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");

  let res;

  if (sessionId) {
    // Retrieve client secret from existing checkout session ID
    res = await getClientSecret(sessionId);
  } else {
    // Create a checkout session if no checkout session ID is provided
    res = await createCheckoutSession();
  }

  const clientSecret = res.clientSecret;
  const checkoutSessionId = res.checkoutSessionId;

  // Add checkout session ID to the URL (to avoid losing it on page refresh and reusing it)
  addToUrl(clientSecret, checkoutSessionId);

  ...
};
```

The `getClientSecret` and `createCheckoutSession` functions are used to retrieve the client secret from an existing checkout session or create a new checkout session, respectively. You should implement these functions in your server-side code. Check the `server.js` file for an example of how you can do this using Node.js and Express.

## Step 3: Display available payment methods

Afterwards, initialize the Nemuru SDK (`await nemuru.init()`), and retrieve the available payment methods (`nemuru.paymentMethods()`). This will return a list of available payment methods that you can display to your customer based on the order amount supplied.

You can then display each payment method specific conditions (`nemuru.paymentMethod()`).

```javascript
const initialize = async () => {
  ...

  // Initialize Nemuru (ensure awaiting async promise)
  await nemuru.init(AGENT_ID);

  // Available payment methods
  const paymentMethods = nemuru.paymentMethods({ amount: 875 });

  // Display each payment method
  paymentMethods.forEach((paymentMethodType) => {
    mountPaymentMethod(paymentMethodType);
  });

  // Show the pay button
  document.querySelector("#pay-btn").style.display = "block";
};
```

## Step 4: Mount the payment intent process

When the customer selects a payment method and clicks your 'pay' button, you can then create a payment intent via server-side call (this attaches a payment intent to checkout session).

After creating the payment intent, you can mount the payment intent process so that your customer can complete the payment process (`nemuru.paymentIntent()`).

```html
<div id="payment-intent"></div>
<script>
  const onPay = async () => {
    // Get the selected payment method
    const paymentMethodType = document.querySelector(
      'input[name="payment-method"]:checked'
    )?.value;

    // Get the client secret and checkout session ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");
    const secret = urlParams.get("secret");

    if (!paymentMethodType || !sessionId || !secret) return;

    const response = await fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        payment_method_type: paymentMethodType,
        checkout_session_id: sessionId,
        client_secret: secret,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { paymentMethodId, accessToken, clientSecret } =
      await response.json();

    const paymentIntent = nemuru.paymentIntent({
      paymentMethodType,
      paymentMethodId,
      accessToken,
      clientSecret,
      onClose: (status) => console.log("onClose", status),
      onError: (error) => console.log("onError", error),
    });

    paymentIntent.mount("#payment-intent");
  };
</script>
```
