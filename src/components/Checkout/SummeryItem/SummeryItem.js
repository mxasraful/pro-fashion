import { TrashIcon } from '@primer/octicons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../CartContext/CartContext';

const SummeryItem = ({dt, userAddressValue}) => {

    const { deleteItem } = useCart()

    return (
        <div className="checkoutSummaryItem d-flex mb-3 pb-2">
            <div className="col-2 mb-1">
                <img src={dt?.img} alt="" className="img-fluid" />
            </div>
            <div className="col-7 ps-1 text-sm">
                <Link style={{ color: "rgb(94, 152, 238)", textDecoration: "none" }} to=""><small>{dt?.name}</small></Link><br />
                <small>Items: {dt?.qty}</small>
            </div>
            <div className="col-3">
                <div className="mb-2 mt-2">
                    <h6 className="ms-2 text-warning">${dt?.price * dt?.qty}</h6>
                </div>
                <div className="">
                    <div class="modal fade checkoutItemRemoveModal mt-5" id={"checkoutItemDeleteModal" + userAddressValue?.indexOf(dt)} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div className="text-center mt-5">
                                    <h5>Delete Item</h5>
                                </div>
                                <div class="modal-body px-5 py-5 text-center">
                                    <button onClick={() => deleteItem(dt?.id)} type="button" class="btn btn-outline-danger mb-4 px-5 addressDeleteBtn" data-bs-dismiss="modal">Delete</button><br />
                                    <button type="button" class="btn btn-outline-secondary addressDeleteCancelBtn px-5" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-warning btn-sm checkoutItemDeleteBtn ms-4" data-bs-toggle="modal" data-bs-target={"#checkoutItemDeleteModal" + userAddressValue?.indexOf(dt)}>
                        <TrashIcon size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummeryItem;