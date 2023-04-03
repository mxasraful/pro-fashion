import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../../Reusable/Product/Product';
import './SomeFeaturedProducts.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const SomeFeaturedProducts = () => {

    const [products, setProduct] = useState(null)
    const [hmpMenu, setHmpMenu] = useState('all')

    // Item added in car notify
    const notify = () => toast(
        <div class="">
            <span>Item added in cart.</span>
            <Link to='/cart' className="btn btn-outline-info btn-sm text-center ms-4 px-3 ">View Cart</Link>
        </div>
    );

    useEffect(() => {
        if (hmpMenu === "all") {
            setProduct(null)
            fetch("http://localhost:3001/products")
                .then(res => res.json())
                .then(data => setProduct(data.splice(0, 6)))
                .catch(err => console.log(err.message))
        } else {
            setProduct(null)
            fetch("http://localhost:3001/products/men/" + hmpMenu)
                .then(res => res.json())
                .then(data => setProduct(data.splice(0, 6)))
                .catch(err => console.log(err.message))
        }
    }, [hmpMenu])

    return (
        <div>
            {/* Item added in notification panel. */}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                rtl={false}
            />

            <div className="container">
                <div className="homeProductsMenuItems d-flex mt-5 mb-5">
                    <span onClick={() => setHmpMenu("all")} className={hmpMenu === "all" ? "me-4 mt-5 hpmItem hpmActive" : "me-4 mt-5 hpmItem"}>All Products</span>
                    <span onClick={() => setHmpMenu("t-shirt")} className={hmpMenu === "t-shirt" ? "me-4 mt-5 hpmItem hpmActive" : "me-4 mt-5 hpmItem"}>T-Shirt</span>
                    <span onClick={() => setHmpMenu("panjabi")} className={hmpMenu === "panjabi" ? "me-4 mt-5 hpmItem hpmActive" : "me-4 mt-5 hpmItem"}>Panjabi</span>
                </div>
                <div className="row">
                    {
                        products ?
                            <>
                                {
                                    products?.map(dt => (
                                        <div className="col-sm-2 mb-5">
                                            <Product notify={notify} productData={dt} />
                                        </div>
                                    ))
                                }
                            </>
                            :
                            <div className="hpLoader text-center my-5">
                                <div class="spinner-border text-secondary" style={{ margin: "58px 0" }} role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SomeFeaturedProducts;