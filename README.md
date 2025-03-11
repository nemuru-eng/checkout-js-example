# checkout.js

These examples demonstrate how to use the Nemuru Checkout.js SDK to create a checkout session and display the available payment methods to your customers.

### [01 - Using Checkout Session component](01-using_checkout_session_component/README.md)

This example will teach you how to create a checkout session and mount Nemuru's checkout session component in your website. This is a pre-built checkout component that will display the different payment methods available to your customers and handle the payment process for you.

If you want to learn how to re-open an existing checkout session, check the [Re-open an existing checkout session](03-reopening_checkout_session_component/README.md) example.

### [02 - Using Payment Intent component](02-using_payment_intent_component/README.md)

This example will teach you how to retrieve the available payment methods and display them to your customers. This is useful if you want to create a custom payment form or integrate specific payment methods from Nemuru into your existing checkout flow, rather than using the pre-built checkout session component.

Note that this will require you to handle the payment process yourself, including creating a checkout session and handling the payment method selection (creating payment intents), which can be more complex than using the pre-built checkout session component.

### [03 - Reopening an existing checkout session](03-reopening_checkout_session_component/README.md)

This example will teach you how to re-open an existing checkout session using the `sessionId` URL parameter. This is useful if you want to allow customers to return to a checkout session that they previously started, without having to start a new session. In this example, the checkout session component will be mounted with the existing session data, allowing the customer to continue the payment process from where they left off.

You can re-use this logic and implement the [Payment Intent component](02-using_payment_intent_component/README.md) to handle the payment process yourself while still allowing customers to return to an existing session.

### [04 - Showing payment method conditions](04-show_payment_method_conditions/README.md)

This example will teach you how to display the specific conditions for each payment method available to your customers. This is useful if you want to provide more information about each payment method, such as fees, and other details that may affect the customer's decision to use a particular payment method.

### [05 - Upload documentation](05-using_documentation/README.md)

If you want to allow your users and/or customers to upload required documents by lenders to review, you can use this example to learn how to embed our documentation form in your website.
