import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm/StripePaymentForm';

const PaymentCard = ({setSuccessPayment, setPaymentId}) => {

    const stripePromise = loadStripe('pk_test_51IdfRoF1fXyFzjChI92Hjve7nRNhNen4D35kH4kxQCJ3KHWY8jEPPN05nmjIhCNyCdBjYA0euNJx9RyPau1PDv7F00B0qN62u5');

    return (
        <div className="cardPaymentOption">
            <div className="px-5 text-center">
                <h4 className="mb-4">Payment With Your Credit or Debit Card</h4>
                <Elements stripe={stripePromise}>
                    <StripePaymentForm setSuccessPayment={setSuccessPayment} setPaymentId={setPaymentId} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentCard;