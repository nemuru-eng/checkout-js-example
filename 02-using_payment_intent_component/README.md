# Using Payment Intent component

This example demonstrates how to create a new checkout session and open an specific payment method by using the Payment Intent component.

This example uses the Nemuru checkout.js SDK to retrieve the available payment methods (`.availablePaymentMethods`), display each payment method conditions (`.paymentMethodConditions`), and then open an specific payment intent (`.paymentIntent`), once a checkout session has been created.

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

## Step 2: Display available payment methods

Initialize the Nemuru SDK (`await nemuru.init()`), and retrieve the available payment methods (`nemuru.availablePaymentMethods()`). This will return a list of available payment methods that you can display to your customer based on the order amount supplied.

You can then display each payment method specific conditions (`nemuru.paymentMethodConditions()`).

```javascript
const initialize = async () => {
  ...

  // Initialize Nemuru (ensure awaiting async promise)
  await nemuru.init(AGENT_ID);

  // Available payment methods
  const paymentMethods = nemuru.availablePaymentMethods({ amount: 875 });

  // Display each payment method
  paymentMethods.forEach((paymentMethodType) => {
    mountPaymentMethod(paymentMethodType);
  });

  // Show the pay button
  document.querySelector("#pay-btn").style.display = "block";
};
```

## Step 3: Create or retrieve the Checkout Session

When the customer selects a payment method and clicks your 'pay' button, you can then create the checkout session via server-side call. This will return a `clientSecret` that you can use later to mount the Payment Intent component in your website.

This example uses the `sessionId` URL parameter to re-open an existing checkout session. You can use this parameter to re-open a checkout session that was previously created for your order. If no `sessionId` is found within the URL, a new checkout session will be created.

This logic is handled in the `public/index.html` file, within the `onPay` function.

```html
<script>
  const onPay = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("sessionId");
    const secret = urlParams.get("secret");

    let res;

    if (sessionId && secret) {
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
</script>
```

The `getClientSecret` and `createCheckoutSession` functions are used to retrieve the client secret from an existing checkout session or create a new checkout session, respectively. You should implement these functions in your server-side code. Check the `server.js` file for an example of how you can do this using Node.js and Express.

## Step 4: Mount the Payment Intent component

Once the `clientSecret` is retrieved, you can mount the Payment Intent component in your website by calling the `nemuru.paymentIntent()` function.

Pass the desired `paymentMethodType` and `clientSecret`, and optional callbacks to the function. This function will return a Payment Intent object that you can use to mount the Payment Intent component in your website.

```html
<div id="payment-intent"></div>
<script>
  const onPay = async () => {
    ...

    // Mount the payment intent
    const paymentIntent = nemuru.paymentIntent({
      paymentMethodType,
      clientSecret,
      onClose: (status) => console.log("onClose", status),
      onError: (error) => console.log("onError", error),
    });

    paymentIntent.mount("#payment-intent");
  };
</script>
```
