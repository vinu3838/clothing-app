import StripeCheckout from 'react-stripe-checkout';

import React from 'react'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51Jln5NSCH1NHO3Q7iJI6lTIYrMerNeSMvUiLM3bmOyE4Ys1gajlnzN3AYarktQKEwSJWG6vw5sNUvZjcw4tUvjQ200rYKj8Phw'
    const onToken = (token) => {
        console.log(token);
        alert('payment Successful');
    }
    return (
        <div>
            <StripeCheckout
                label='Pay Now'
                name='CRWN Clothing'
                billingAddress
                shippingAddress
                bitcoin
                image='https://svgshare.com/i/CUz.svg'
                description={`Your total is $${price}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                token={onToken}
                stripeKey={publishableKey} />
        </div>
    )
}

export default StripeCheckoutButton
