import React, { useState } from 'react';
import PaymentCard from './PaymentCard/PaymentCard';
import './CheckoutPayment.css';
import { useCart } from '../../../CartContext/CartContext';
import { useAuth } from '../../../auth/auth';

const CheckoutPayment = ({ setProcessOrder, setSuccessOrder, setOrderError }) => {

    const [successPayment, setSuccessPayment] = useState(false)
    const [paymentId, setPaymentId] = useState(null)

    // Get money data from context api
    const { cartItems, subtotalMoney, shipMoney, taxMoney, totalMoney } = useCart()

    // Get user from context api
    const { user } = useAuth()

    // Submit Order
    const submitOrder = () => {
        setProcessOrder(true)
        setSuccessOrder(false)
        if (paymentId || user.email) {
            fetch('http://localhost:3001/place-order', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems,
                    email: user?.email,
                    subtotal: subtotalMoney,
                    shipping: shipMoney,
                    tax: taxMoney,
                    total: totalMoney
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        setSuccessOrder(true)
                        setProcessOrder(false)
                        localStorage.removeItem('pf-cart')
                    } else {
                        setOrderError(true)
                    }
                })
                .catch(err => {
                    setOrderError(true)
                })
        } else {
            setProcessOrder(false)
            alert("Please complete your payment process and then confirm the order.")
        }
    }

    return (
        <div className="checkoutPayment row">
            <div className="col-sm-8">
                <h4 className="mb-5">Payment</h4>
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Select Your Payment Option</h5>
                        <div class="accordion mt-4 paymentItems position-relative" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button d-flex" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <h6 className="col-11" id="bkashPayOpt">bKash Payment</h6>
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <span className="text-danger">bKash Payment is not available on this time. Pleace select other option.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed d-flex" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <h6 className="col-11" id="bkashPayOpt">Paypal Payment</h6>
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <span className="text-danger">PayPal Payment is not available on this time. Please select card option for payment.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed d-flex" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <h6 className="col-11" id="bkashPayOpt">Card Payment</h6>
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <PaymentCard setSuccessPayment={setSuccessPayment} setPaymentId={setPaymentId} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        successPayment &&
                        <div className="paySuccessMsg d-flex align-items-center justify-content-center position-absolute">
                            <h5>Payment Successful.</h5>
                        </div>
                    }
                </div>
            </div>
            <div className="col-sm-4">
                <div className="card">
                    <div className="card-header">
                        <h4>Price Details</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-8">
                                <div className="h6">Items Price:  </div>
                                <div className="h6">Delivery Charge:  </div>
                                <div className="h6">Tex:  </div>
                                <div className="h5">Total Price:  </div>
                            </div>
                            <div className="col-4 text-right">
                                <div className="h6 text-right">$ {subtotalMoney}</div>
                                <div className="h6">$ {shipMoney}</div>
                                <div className="h6">$ {taxMoney}</div>
                                <div className="h5">$ {totalMoney}</div>
                            </div>
                        </div>
                        <button className="btn btn-outline-info w-100 mt-5" onClick={submitOrder} disabled={successPayment ? "" : "disabled"}>Confirm Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;