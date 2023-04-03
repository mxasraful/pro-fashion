import { CheckCircleFillIcon } from '@primer/octicons-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import './Checkout.css';
import CheckoutPayment from './CheckoutPayment/CheckoutPayment';
import CheckoutShipping from './CheckoutShipping/CheckoutShipping';

const Checkout = () => {

    const [payment, setPayment] = useState(false)
    const [addressAdded, setAddressAdded] = useState(false)
    const [addressDeleted, setAddressDeleted] = useState(null)
    const [processOrder, setProcessOrder] = useState(false)
    const [successOrder, setSuccessOrder] = useState(false)
    const [orderError, setOrderError] = useState(false)

    const { cartItems } = useCart()

    useEffect(() => {
        if (addressAdded) {
            setTimeout(() => {
                setAddressAdded(false)
            }, 4000)
        }

        if (addressDeleted) {
            setTimeout(() => {
                setAddressDeleted(null)
            }, 4000)
        }
    }, [addressAdded, addressDeleted])

    return (
        <div className="checkoutComp mb-5">
            {
                successOrder ?
                    <div className="orderSuccessMessage d-flex justify-content-center align-items-center" style={{ margin: "20vh 0" }}>
                        <div className=" card rounded text-center p-4" style={{ maxWidth: "400px" }}>
                            <div className="card-body">
                                <h4 className="mb-5">Order Placed Successful.</h4>
                                <a href="/" className="btn btn-outline-info px-5">Continue Shopping</a>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        {
                            processOrder &&
                            <div className="checkoutLoader text-center position-absolute w-100 h-100 bg-light" style={{ top: "0", height: "100vh", left: "0", zIndex: "1000000000000000000000000000000" }}>
                                <div class="spinner-border text-secondary" style={{ marginTop: "48vh" }} role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }
                        <div className="container">
                            <div className="checkoutMain">
                                {
                                    addressDeleted &&
                                    <div class="alert alert-warning alert-dismissible fade show mt-4" role="alert">
                                        <CheckCircleFillIcon size='16' fill="#FFC107" />
                                        <span className="ms-2">Address Deleted.</span>
                                        {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                                    </div>
                                }
                                {
                                    addressAdded &&
                                    <div class="alert alert-success alert-dismissible fade show mt-4" role="alert">
                                        <CheckCircleFillIcon size='16' fill="green" />
                                        <span className="ms-2">Address Added.</span>
                                        {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
                                    </div>
                                }
                                {
                                    cartItems?.length ?
                                        <>
                                            <div className="checkoutProgress d-flex justify-content-center mt-4">
                                                <div className="" style={{ width: "550px" }}>
                                                    <div className="d-flex">
                                                        <div className="w-50 checkoutProgressShipping text-center">
                                                            <CheckCircleFillIcon size='30' fill="#0DCAF0" />
                                                            <h5>Shipping & Summery</h5>
                                                        </div>
                                                        <div className="w-50 checkoutProgressPayment text-center">
                                                            <CheckCircleFillIcon size='30' fill={payment ? "#0DCAF0" : "#6C7592"} />
                                                            <h5 className={payment ? "text-dark" : "text-secondary"}>Payment & Place Order</h5>
                                                        </div>
                                                    </div>
                                                    <div class="progress">
                                                        <div class="progress-bar progress-bar-striped bg-info" role="progressbar" style={{ width: payment ? "100%" : "50%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                {
                                                    payment ?
                                                        <CheckoutPayment setProcessOrder={setProcessOrder} setSuccessOrder={setSuccessOrder} setOrderError={setOrderError} />
                                                        :
                                                        <CheckoutShipping addressDeleted={addressDeleted} setAddressDeleted={setAddressDeleted} setPayment={setPayment} addressAdded={addressAdded} setAddressAdded={setAddressAdded} />
                                                }
                                            </div>
                                        </>
                                        :
                                        <div className="checkoutShopAlert" style={{ padding: "25vh 0" }}>
                                            <div className="text-center">
                                                <span>You don't have any item in your cart.</span>
                                                <br /><br />
                                                <Link to="/" className="btn btn-sm btn-success">Shop Now</Link>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default Checkout;