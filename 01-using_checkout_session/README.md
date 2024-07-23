# Create and mount a new Checkout Session

This example will teach you how to create a Checkout Session and mount Nemuru's Checkout Session Component in your website. This is a pre-built component that will handle the payment process for you.

If you want to learn how to re-open an existing Checkout Session, check the [Re-open an existing Checkout Session](../03-reopening_checkout_session/README.md) example.

If you prefer not to use the Checkout Session Component, you can use the [Payment Methods](../02-using_payment_methods/README.md) example.

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

To create a Checkout Session, you will need to make a server-side request to Nemuru's API. Check the `server.js` example of how you can do this using Node.js and Express.

Once the Checkout Session is created, you will receive a `clientSecret` that you will use to mount the Checkout Session Component in your website.

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
