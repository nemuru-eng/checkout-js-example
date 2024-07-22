# checkout.js

These examples demonstrate how to use the Nemuru Checkout.js SDK to create a checkout session and display the available payment methods to your customers.

### [01 - Using Checkout Session component](01-using_checkout_session/README.md)

This example will teach you how to create a checkout session and mount Nemuru's checkout session component in your website. This is a pre-built component that will handle the payment process for you.

If you want to learn how to re-open an existing checkout session, check the [Re-open an existing checkout session](03-reopening_checkout_session/README.md) example.

### [02 - Using Payment Methods](02-using_payment_methods/README.md)

This example will teach you how to retrieve the available payment methods and display them to your customers. This is useful if you want to create a custom payment form or integrate Nemuru's payment methods into your existing checkout flow, rather than using the pre-built checkout session component.

Note that this will require you to handle the payment process yourself, including creating a checkout session and handling the payment method selection (creating payment intents), which can be more complex than using the pre-built checkout session component.

### [03 - Reopening an existing checkout session](03-reopening_checkout_session/README.md)

This example will teach you how to re-open an existing checkout session using the `sessionId` URL parameter. This is useful if you want to allow customers to return to a checkout session that they previously started, without having to start a new session. In this example, the checkout session component will be mounted with the existing session data, allowing the customer to continue the payment process from where they left off.
