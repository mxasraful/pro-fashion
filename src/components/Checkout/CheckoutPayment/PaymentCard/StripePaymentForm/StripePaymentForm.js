import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const StripePaymentForm = ({ setSuccessPayment, setPaymentId }) => {

    const [payErrorMsg, setPayErrorMsg] = useState(null)

    const stripe = useStripe();
    const elements = useElements();

    // Handle Payment Form Submit
    const handleSubmit = async (event) => {

        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setSuccessPayment(false)
            setPayErrorMsg(error.message)
            setPaymentId(null)
        } else {
            setPaymentId(paymentMethod.id)
            setSuccessPayment(true)
            setPayErrorMsg(null)
        }
    };

    return (
        <div >
            {
                payErrorMsg &&
                <div className="alert-danger">
                    {payErrorMsg}
                </div>
            }
            <div className="card">
                <form className="card-body" onSubmit={handleSubmit}>
                    <CardElement />
                    <button type="submit" n className='btn btn-outline-info w-100 mt-5' disabled={!stripe && "disabled"}>Pay</button>
                </form>
            </div>
        </div>
    );
};

export default StripePaymentForm;