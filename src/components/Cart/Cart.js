import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import CartItem from './CartItem/CartItem';
import './Cart.css'
import { useAuth } from '../../auth/auth';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { QuestionIcon } from '@primer/octicons-react';


const Cart = () => {

    const { cartItems, subtotalMoney, shipMoney, taxMoney, totalMoney } = useCart()
    const { user } = useAuth()

    // Cart item deleted notify
    const notify = () => toast("Cart item deleted.");


    return (
        <div className="cartComp">

            {/* Item Delete Nitrification panel*/}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                rtl={false}
            />

            <div className="container">
                <h1 className="mt-4">Shopping cart</h1>
                {
                    cartItems?.length ?
                        <div className="row">
                            <div className="col-md-4" style={{ padding: "0" }}>
                                <div style={{ position: "sticky", top: "0", paddingTop: "20px", paddingBottom: "50px" }}>
                                    <div className="cart-order-summary">
                                        <h4 className="py-2 bg-light cart-order-summary-title">
                                            <span className="ms-3">Order Summary</span>
                                        </h4>
                                        <div className="cart-order-summary-options px-4">
                                            <div className="mt-3 text-secondary">Shipping and additional costs are calculated based on values you have entered.</div>
                                            <hr />
                                            <div className="cart-order-summary-order-subtotal d-flex">
                                                <h5 className="me-auto">Order Subtotal</h5>
                                                <h5 className="text-secondary">$ {subtotalMoney}</h5>
                                            </div>
                                            <hr />
                                            <div className="cart-order-summary-order-subtotal d-flex">
                                                <h5 className="me-auto">
                                                    <span>Shipping and handling</span>
                                                    <button type="button" id="cartShipPopover" className="popoverBtn ms-2" data-toggle="popover"
                                                        data-bs-content="We charge $2.00 delivery for each item.">
                                                        <QuestionIcon size={16} />
                                                    </button>
                                                </h5>
                                                <h5 className="text-secondary">$ {shipMoney}</h5>
                                            </div>
                                            <hr />
                                            <div className="cart-order-summary-order-subtotal d-flex">
                                                <h5 className="me-auto">
                                                    <span>Tax</span>
                                                    <button type="button" id="cartTaxPopover" className="popoverBtn ms-2" data-toggle="popover"
                                                        data-bs-content="2% tax is added to the total amount.">
                                                        <QuestionIcon size={16} />
                                                    </button></h5>
                                                <h5 className="text-secondary">$ {taxMoney}</h5>
                                            </div>
                                            <hr />
                                            <div className="cart-order-summary-order-subtotal d-flex">
                                                <h5 className="me-auto">Total</h5>
                                                <h4 className="text-dark">$ {totalMoney}</h4>
                                            </div>
                                            <br />

                                            <div class="tooltip bs-tooltip-top" role="tooltip">
                                                <div class="tooltip-arrow"></div>
                                                <div class="tooltip-inner">
                                                    Some tooltip text!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body mt-4">
                                            <Link to={user?.email ? "/checkout" : "/login?for=checkout"} className="btn btn-outline-info px-5 py-2 ms-auto w-100">
                                                <span>Proceed to Checkout</span>
                                                <svg style={{ marginTop: "-3px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 cart-order-items py-5 px-5">
                                {
                                    cartItems?.map(dt => (
                                        <CartItem notify={notify} dt={dt} />
                                    ))
                                }
                            </div>
                        </div>
                        :
                        <>
                            <div className="text-center" style={{ padding: "20vh 0" }}>
                                <span>Don't have any item in your cart.</span><br />
                                <Link to="/" className="btn btn-outline-success px-4 btn-sm mt-4" >Shop Now</Link>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Cart;