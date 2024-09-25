# Re-open an existing checkout session

This example will teach you how to re-open an existing checkout session and mount Nemuru's checkout session component in your website.

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
  addToUrl(checkoutSessionId);

  // Initialize Nemuru (ensure awaiting async promise)
  await nemuru.init(AGENT_ID);

  // Mount the checkout session
  mountCheckoutSession(clientSecret);
};
```

The `getClientSecret` and `createCheckoutSession` functions are used to retrieve the client secret from an existing checkout session or create a new checkout session, respectively. You should implement these functions in your server-side code. Check the `server.js` file for an example of how you can do this using Node.js and Express.

## Step 3: Mount the Checkout Session component

After creating the checkout session, you can mount the checkout session component in your website. Check the `public/index.html` example of how you can do this.

```html
<div id="checkout-session"></div>
<script>
  const mountCheckoutSession = (clientSecret) => {
    // Set the session ID
    const checkoutSession = nemuru.checkoutSession({
      clientSecret,
      onLoaded: () => console.log("onLoaded"),
      onComplete: (status) => console.log("onComplete", status),
      onError: (error) => console.log("onError", error),
      onPaymentIntentClosed: ({ paymentMethodId, paymentMethodType, status }) =>
        console.log("onPaymentIntentClosed"),
    });
    // Mount the checkout session
    checkoutSession.mount("#nemuru-checkout");
  };
</script>
```
