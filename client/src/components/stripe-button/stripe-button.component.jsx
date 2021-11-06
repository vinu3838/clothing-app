import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51Jln5NSCH1NHO3Q7iJI6lTIYrMerNeSMvUiLM3bmOyE4Ys1gajlnzN3AYarktQKEwSJWG6vw5sNUvZjcw4tUvjQ200rYKj8Phw";
    const onToken = token => {
        axios({
            url: "/payment",
            method: "post",
            data: {
                amount: priceForStripe,
                description: 'This is description',
                token,
            },
        })
            .then(response => {
                alert("Payment successful");
            })
            .catch(error => {
                console.log(`Payment error: ${JSON.parse(error)}`);
                alert("There was an issue with payment");
            });
    };
    return (
        <div>
            <StripeCheckout
                label="Pay Now"
                name="CRWN Clothing"
                billingAddress
                shippingAddress
                bitcoin
                image="https://svgshare.com/i/CUz.svg"
                description={`Your total is INR ${price}`}
                amount={priceForStripe}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={publishableKey}
            />
        </div>
    );
};

export default StripeCheckoutButton;
