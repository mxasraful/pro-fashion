import { ArrowRightIcon } from '@primer/octicons-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/auth';
import { useCart } from '../../../CartContext/CartContext';
import AddAddress from '../AddAddress/AddAddress';
import AddressItem from '../AddressItem/AddressItem';
import SummeryItem from '../SummeryItem/SummeryItem';

const CheckoutShipping = ({ addressDeleted, setAddressDeleted, setPayment, addressAdded, setAddressAdded }) => {

    const [loading, setLoading] = useState(false)
    const [fetchError, serFetchError] = useState(false)

    const [haveAddress, setHaveAddress] = useState(true)
    const [userAddressValue, setUserAddressValue] = useState(null)

    const [selectedAddress, setSelectedAddress] = useState(null)

    const { user } = useAuth()
    const { cartItems } = useCart()

    // Proceed to pay function
    const prosedToPay = () => {
        if (cartItems) {
            if (haveAddress) {
                setPayment(true)
            } else {
                setPayment(false)
            }
        } else {

        }
    }

    // get users address
    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3001/address/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setUserAddressValue(data)
                    setSelectedAddress(data[0]._id)
                    setHaveAddress(true)
                    setLoading(false)
                } else {
                    setUserAddressValue(null)
                    setHaveAddress(false)
                    setLoading(false)
                }
            })
            .catch(err => {
                serFetchError(true)
                setLoading(false)
            })
    }, [user, addressAdded, addressDeleted])

    // Hide Address added message
    useEffect(() => {
        setTimeout(() => setAddressAdded(false), 4000)
    }, [setAddressAdded])

    return (
        <div className="row">
            <div className="checkoutAddressOption col-sm-8">
                <div className="">
                    <div className="card-body">
                        <h4 className="mb-3">Shipping Address</h4>
                        {
                            loading ?
                                <div className="py-5 text-center">
                                    <span>Loading...</span>
                                </div>
                                :
                                <>
                                    {
                                        userAddressValue &&
                                        <div className="have-address-section">
                                            {
                                                userAddressValue.map(dt => (
                                                    <AddressItem setAddressDeleted={setAddressDeleted} userAddressValue={userAddressValue} selectedAddress={selectedAddress} dt={dt} setSelectedAddress={setSelectedAddress} />
                                                ))
                                            }
                                        </div>
                                    }
                                </>
                        }
                        {
                            haveAddress ?
                                <div className="">
                                    <button onClick={() => setHaveAddress(false)} className="btn btn-outline-success px-5">Add a Address</button>
                                </div>
                                :
                                <AddAddress setAddressAdded={setAddressAdded} />
                        }
                    </div>
                </div>
                <br /><br />
                <div className="checkoutPaymentOptionSection">

                </div>
            </div>
            <div className="checkoutAddressOption col-sm-4">
                <div className="card bg-light">
                    <div className="card-header">
                        <h4>Order Summary</h4>
                    </div>
                    <div className="card-body">
                        {
                            cartItems?.length ?
                                <div class="accordion" id="accordionExample">
                                    <div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">{cartItems.length} Items in Cart</button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body checkoutSummaryItems">
                                                    {
                                                        cartItems.map(dt => (
                                                            <SummeryItem dt={dt} userAddressValue={userAddressValue} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 text-light">
                                        <button onClick={prosedToPay} className="checkoutPaymentBtn btn btn-outline-info px-5 w-100 py-2">
                                            <span class="me-2">Proceed to Pay</span>
                                            <ArrowRightIcon size={16} />
                                        </button>
                                    </div>
                                </div>
                                :
                                <>
                                    {
                                        fetchError ?
                                            <div className="text-center">
                                                <h6>We could not get data from the database.</h6>
                                            </div>
                                            :
                                            <div>
                                                <div className="text-center py-5">Don't have any item in cart.</div>
                                            </div>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutShipping;