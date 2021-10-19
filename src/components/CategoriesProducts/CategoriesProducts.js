import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Product from '../Reusable/Product/Product';
import './CategoriesProducts.css';

const CategoriesProducts = ({ men }) => {

    const [products, setProducts] = useState(null)

    const path = useParams()

    useEffect(() => {
        fetch(`https://arcane-sierra-30035.herokuapp.com/products/${men ? "men" : "women"}/${path.cate}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
            .catch(err => {
                setProducts(null)
            })
    }, [path, men])

    
    // Item added in cart notify
    const notify = () => toast(
        <div class="">
            <span>Item added in cart.</span>
            <Link to='/cart' className="btn btn-outline-info btn-sm text-center ms-4 px-3 ">View Cart</Link>
        </div>
    );



    return (
        <div className="categoriesProductsComp">
            {/* Item added in notification panel. */}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                rtl={false}
            />
            <div className="container">
                {
                    products ?
                        <>
                            {
                                products?.length ?
                                    <>
                                        <h2 className="categoriesProductsPgTitle mt-5 mb-3"><span className="text-uppercase">{path.cate.slice(0, 1)}</span>{path.cate.slice(1, 40)}</h2>
                                        <nav aria-label="breadcrumb mb-4">
                                            <ol class="breadcrumb">
                                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                                <li class="breadcrumb-item"><Link to={men ? "/men" : "/women"}>{men ? "Men" : "Women"}</Link></li>
                                                <li class="breadcrumb-item active" aria-current="page"><span className="text-uppercase">{path.cate.slice(0, 1)}</span>{path.cate.slice(1, 40)}</li>
                                            </ol>
                                        </nav>
                                        {
                                            products ? (
                                                <div className="row">
                                                    {
                                                        products.map(dt => (
                                                            <div className="col-sm-3 mb-5">
                                                                <Product notify={notify} productData={dt} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ) : (
                                                <div className="categoriesProductsLoader">
                                                    <img src="" alt="" className="img-fluid my-5" />
                                                </div>
                                            )
                                        }
                                    </>
                                    :
                                    <div className="my-5 text-center">
                                        <div className="" style={{ margin: "30vh 0" }}>
                                            <span>Sorry we don't have any items in this category.</span><br /><br />
                                            <Link to="/" className="btn btn-sm btn-outline-info px-4">Go To Home</Link>
                                        </div>
                                    </div>
                            }
                        </>
                        :
                        <div className="categoriesProductsLoader">
                            <div className="text-center">
                                <div class="spinner-border text-secondary" style={{ margin: "200px 0" }} role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default CategoriesProducts;