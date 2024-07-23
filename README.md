# checkout.js

These examples demonstrate how to use the Nemuru Checkout.js SDK to create a Checkout Session and display the available payment methods to your customers.

### [01 - Create and mount a new Checkout Session](01-using_checkout_session/README.md)

This example will guide you on creating a Checkout Session and integrating Nemuru's pre-built Checkout Session Component into your website. This component will handle the payment process for you.

If you prefer not to use the Checkout Session Component, you can use the [next example](../02-using_payment_methods/README.md).

If you want to learn how to re-open an existing Checkout Session, check the [Re-open an existing Checkout Session](03-reopening_checkout_session/README.md) example.

### [02 - Using Payment Methods](02-using_payment_methods/README.md)

This example will guide you on retrieving the available payment methods and displaying them to your customers. This is useful if you want to create a custom payment form or integrate Nemuru's payment methods into your existing checkout flow, instead of using the pre-built Checkout Session Component.

Note that this will require you to handle the payment process yourself, including creating a Checkout Session and handling the payment method selection (creating payment intents), which can be more complex than using the pre-built Checkout Session Component.

### [03 - Reopening an existing Checkout Session](03-reopening_checkout_session/README.md)

This example will guide you on re-opening an existing Checkout Session using the `sessionId` URL parameter. This is useful for allowing customers to return to a previously started Checkout Session without beginning a new one. The Checkout Session Component will be mounted with the existing session data, enabling the customer to continue the payment process from where they left off.