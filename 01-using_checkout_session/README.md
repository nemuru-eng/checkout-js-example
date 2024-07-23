# Create and mount a new Checkout Session

This example will guide you on creating a Checkout Session and integrating Nemuru's pre-built Checkout Session Component into your website. 


## Running the example

1. Install dependencies and build the server

```shell
npm install
```

2. Set the following variables with the values provided by Nemuru:
   - `server.js`: set the `USERNAME`, `PASSWORD`, and `AGENT_ID`.
   - `public/index.html`: set the `AGENT_ID`.

3. Run the server

```shell
npm run start
```
**Note:** When you modify `server.js` while running the server, it is necessary to restart it for the changes to take effect.

1. Browse to [http://localhost:4000](http://localhost:4000)


## Remake example in your website
### Prerequisites

Before you begin, ensure you have the following:

- Nemuru's API credentials (API username and password).
- An active point of sale (agent ID)
- A web server setup to serve your website.
  
### Step 1: Install Nemuru's checkout.js SDK

First, you need to install the Nemuru checkout.js SDK. You can do this by including the script directly in your HTML file (check the code inside the `<head>` tag in the `public/index.html`).

```html
<!-- production -->
<script src="https://pay.nemuru.com/prod/checkout-js/checkout.js"></script>

<!-- staging -->
<script src="https://pay.nemuru.com/stg/checkout-js/checkout.js"></script>
```

### Step 2: Create a Checkout Session

To create a Checkout Session, you will need to make a server-side request to Nemuru's API. In the example, the endpoint `POST /create-checkout-session`  in `server.js`. Check its code to see how you can do this using Node.js and Express.

Once the Checkout Session creation request is successfully processed, you will receive a `clientSecret` as a response. This is a secret ID for that Checkout Session that you will use to mount the Checkout Session Component in your website..

### Step 3: Mount the Checkout Session Component

After creating the Checkout Session, you can mount the Checkout Session Component in your website. Check the `public/index.html` example of how you can do this.

```html
<div id="checkout-session"></div>
<script>
  const mountCheckoutSession = (clientSecret) => {
    // Set the secret ID
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
