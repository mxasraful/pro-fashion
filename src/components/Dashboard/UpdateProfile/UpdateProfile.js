import React, { useState } from 'react';
import { useAuth } from '../../../auth/auth';

const UpdateProfile = () => {

    const [displayName, setDisplayName] = useState(null)
    const [email, setEmail] = useState(null)
    const [emailInvalid, setEmailInvalid] = useState(false)

    const { updateUserInfo, updateProfileErr } = useAuth()

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

    return (
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
    );
};

export default UpdateProfile;