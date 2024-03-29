import { PencilIcon } from '@primer/octicons-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/auth';
import './Dashboard.css'

const Dashboard = () => {

    const [displayName, setDisplayName] = useState(null)
    const [email, setEmail] = useState(null)
    const [emailInvalid, setEmailInvalid] = useState(false)
    const [userOrdersHave, setUserOrdersHave] = useState(null)
    const [userOrderItems, setUserOrderItems] = useState(null)

    const { user, updateUserInfo, updateProfileErr, logOut } = useAuth()

    const userToken = localStorage.getItem("pro-fashion-user-id")

    // Handle Update profile
    const handleUpdateProfile = () => {
        if (email) {
            setEmailInvalid(false)
            const emailVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            if (emailVal) {
                setEmailInvalid(false)
                if (displayName) {
                    updateUserInfo({
                        displayName,
                        email
                    })
                } else {
                    updateUserInfo({
                        email
                    })
                }
            } else {
                setEmailInvalid(true)
            }
        } else if (displayName) {
            updateUserInfo({
                displayName
            })
        }
    }

    // Get user order items
    useEffect(() => {
        fetch("http://localhost:3001/user-order-items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userToken}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUserOrdersHave(true)
            setUserOrderItems()
            console.log(data)
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [userToken])

    console.log(userOrderItems)


    return (
        <div className="dashboardComp">
            {/* Edit Profile Modal */}
            <div class="modal fade updateProfileModal" id="accEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Account Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-4 py-5">
                            {
                                updateProfileErr &&
                                <div className="alert-danger mb-5">{updateProfileErr}</div>
                            }
                            <div className="mb-4">
                                <input type="text" className="form-control" onChange={(e) => setDisplayName(e.target.value)} placeholder="Name" />
                            </div>
                            <div className="mb-4">
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                {
                                    emailInvalid &&
                                    <div className="text-danger">Please type a valid email address.</div>
                                }
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={handleUpdateProfile}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="mt-5">
                    {
                        user ?
                            <div className="row dashboardAccAndOrders">
                                <div className="col-sm-5">
                                    <div className="card dashboardAccAndOrdersCard">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <h4>Account</h4>
                                                <button type="button" className="ms-auto btn btn-outline-warning btn-sm px-3" data-bs-toggle="modal" data-bs-target="#accEditModal" >
                                                    <PencilIcon size={16} />
                                                    <span class="ms-2">Edit Account Details</span>
                                                </button>
                                            </div>
                                            <div className="dashAccountDetails text-center mt-5">
                                                <div className="dashAccountPhoto">
                                                    <img src={user?.photo?.length > 3 ? user.photo : "https://www.w3schools.com/howto/img_avatar.png"} alt="" className="img-fluid rounded-circle w-25" />
                                                </div>
                                                <h4 className="mt-3">{user?.name}</h4>
                                                <span className="mt-3 mb-5">{user?.email}</span><br /><br />
                                                <button onClick={logOut} className="btn btn-sm px-3 btn-outline-danger">Sign Out</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="card dashboardAccAndOrdersCard">
                                        <div className="card-body">
                                            <h4>My Orders</h4>
                                            <div className="dashMyOrders">
                                                {
                                                    userOrdersHave === null ?
                                                        <div className="text-center">
                                                            <div className='mb-4'>Loading...</div>
                                                        </div>
                                                        : userOrdersHave === false ?
                                                            <div className="text-center">
                                                                <div className='mb-4'>Sorry you don't have any order.</div>
                                                                <Link to="/" className="btn btn-outline-success px-3 btn-sm">Order Now</Link>
                                                            </div>
                                                            : userOrdersHave === true ?
                                                                <div className='userOrderItems'>
                                                                    {
                                                                        userOrderItems?.map(item =>
                                                                            <div className='userOrderItem card w-100'>
                                                                                <div className="card-body">
                                                                                    <h2>Order</h2>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                :
                                                                <div className="text-center">
                                                                    <div className='mb-4'>Sorry you don't have any order.</div>
                                                                    <Link to="/" className="btn btn-outline-success px-3 btn-sm">Order Now</Link>
                                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="dashLoginAlert">
                                <div className="text-center">
                                    <h4>You don't have any logged in account</h4>
                                    <button className="btn btn-outline-success">Login</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;