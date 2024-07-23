# Re-open an existing Checkout Session

This example will teach you how to re-open an existing Checkout Session and mount Nemuru's Checkout Session Component in your website.

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

This example uses the `sessionId` URL parameter to re-open an existing Checkout Session. You can use this parameter to re-open a Checkout Session that was previously created.

If no `sessionId` is found within the URL, a new Checkout Session will be created.

This logic is handled in the `public/index.html` file, within the `initialize` function.

```javascript
const initialize = async () => {
  // Check if Checkout Session ID exists in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");

  let res;

  if (sessionId) {
    // Retrieve client secret from existing Checkout Session ID
    res = await getClientSecret(sessionId);
  } else {
    // Create a Checkout Session if no Checkout Session ID is provided
    res = await createCheckoutSession();
  }

  const clientSecret = res.clientSecret;
  const checkoutSessionId = res.checkoutSessionId;

  // Add Checkout Session ID to the URL (to avoid losing it on page refresh and reusing it)
  addToUrl(checkoutSessionId);

  // Initialize Nemuru (ensure awaiting async promise)
  await nemuru.init(AGENT_ID);

  // Mount the Checkout Session
  mountCheckoutSession(clientSecret);
};
```

The `getClientSecret` and `createCheckoutSession` functions are used to retrieve the client secret from an existing Checkout Session or create a new Checkout Session, respectively. You should implement these functions in your server-side code. Check the `server.js` file for an example of how you can do this using Node.js and Express.

## Step 3: Mount the Checkout Session Component

After creating the Checkout Session, you can mount the Checkout Session Component in your website. Check the `public/index.html` example of how you can do this.

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
    });
    // Mount the Checkout Session
    checkoutSession.mount("#nemuru-checkout");
  };
</script>
```
