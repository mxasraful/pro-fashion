import { CheckCircleFillIcon, TrashIcon } from '@primer/octicons-react';
import React from 'react';

const AddressItem = ({userAddressValue, selectedAddress, dt, setSelectedAddress}) => {
    return (
        <div>
            <div className={selectedAddress && selectedAddress === dt._id ? "card mb-4 addressActive" : "card mb-4"} id={"addressItem" + dt._id} style={{ cursor: "pointer" }} onClick={() => setSelectedAddress(dt._id)}>
                <div class="modal fade checkoutAddressRemoveAlert mt-5" id={"addressDeleteModal" + userAddressValue?.indexOf(dt)} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div className="text-center mt-5">
                                <h5>Delete Address</h5>
                            </div>
                            <div class="modal-body px-5 py-5 text-center">
                                <button type="button" class="btn btn-outline-danger mb-4 px-5 addressDeleteBtn">Delete</button><br />
                                <button type="button" class="btn btn-outline-secondary addressDeleteCancelBtn px-5" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body d-flex">
                    <div style={{ paddingLeft: "0" }} class="form-check col-11 d-flex">
                        {
                            selectedAddress && selectedAddress === dt._id &&
                            <CheckCircleFillIcon size={16} fill='#198754' />
                        }
                        <div class="ms-3">
                            <span>Road: {dt.Road}, Zip: {dt.zip},, {dt.city}, {dt.district}, {dt.division}, {dt.country === "bd" ? "Bangladesh" : dt.country}</span>
                            <br />
                            <span>Phone: {dt.Phone}</span>
                        </div>
                    </div>
                    <div className="col-1 mt-2 ms-3">
                        <button className="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target={"#addressDeleteModal" + userAddressValue?.indexOf(dt)}>
                            <TrashIcon size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressItem;