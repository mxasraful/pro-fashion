import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../CartContext/CartContext';

const CartItem = ({ dt, notify }) => {

    const [quantity, setQuantity] = useState(dt.qty)

    const { updateQty, deleteItem } = useCart()

    // Delete cart item
    const deleteCartItem = (id) => {
        deleteItem(id)
        notify()
    }

    // Update a item data
    const updateItemQty = (qtyPlus) => {
        if (qtyPlus === true) {
            setQuantity(quantity + 1)
            dt.qty = quantity + 1
            updateQty(dt)
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1)
                dt.qty = quantity - 1
                updateQty(dt)
            }
        }
    }

    return (
    <div className="cart-item mb-4 pb-3 border-bottom">
            {
                dt ?
                    <div className='row'>
                        <div className="col-md-6 d-flex">
                            <div className="col-4 cart-item-img pe-3">
                                <img src={dt?.img} alt="" className="img-fluid" />
                            </div>
                            <div className="col-8 cart-item-title mt-2 pe-4">
                                <Link to={"/product/" + dt?.for + "/" + dt?.categories + "/" + dt?.id} style={{ textDecoration: "none" }} className="text-dark"><h5 className="text-secondary">{dt?.name}</h5> </Link>
                                <div className="text-secondary">{dt?.size ? "Size: " + dt?.size : ""}</div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex">
                            <div className="col-2 cart-item-price mt-4">
                                <h5 className="text-dark">${dt?.price}</h5>
                            </div>
                            <div className="col-6 cart-item-quantity d-flex mt-4">
                                <button onClick={() => updateItemQty(false)} className="cartItemQuantityMinus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                        <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
                                    </svg>
                                </button>
                                <div className="cartItemQuantity text-center">
                                    <h5>{quantity}</h5>
                                </div>
                                <button onClick={() => updateItemQty(true)} className="cartItemQuantityPlus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="col-2 cart-item-total-price mt-4">
                                <h5 className="text-dark">${dt?.price * quantity}</h5>
                            </div>
                            <div className="col-2 text-center cart-item-action ps-5 mt-4">
                                <button onClick={() => deleteCartItem(dt?.id)} style={{ border: "none", background: "none" }} className="text-dark">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="cartItemLoader text-center w-100">
                        <div class="spinner-border text-secondary" style={{ margin: "200px 0" }} role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
            }
        </div>
    );
};

export default CartItem;