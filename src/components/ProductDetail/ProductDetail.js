import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useCart } from '../../CartContext/CartContext';
import Product from '../Reusable/Product/Product';
import 'react-toastify/dist/ReactToastify.css';
import './ProductDetail.css'

const ProductDetail = ({ modal, modalData }) => {

    const [product, setProduct] = useState(null)
    const [image, setImage] = useState(null)
    const [carouselActive, setCarouselActive] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState(null)

    const { setItem } = useCart()

    const { pdId } = useParams()

    useEffect(() => {
        if (modal) {
            setProduct(modalData)
            setImage(modalData?.imgs[0])
        } else {
            fetch(`http://localhost:3001/product/${pdId}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data)
                    setImage(data.imgs[0])
                    setSize(data?.sizes ? data.sizes[0] : null)
                    if (modal) {

                    } else {
                        fetch(`http://localhost:3001/products/${data?.for}/${data?.categories}`)
                            .then(res => res.json())
                            .then(dt => {
                                const dta = dt.filter(pd => pd.id !== data.id)
                                setRelatedProducts(dta.sort(() => Math.random() - 0.5).splice(0, 4))
                            })
                    }
                })
        }
    }, [pdId, modalData, modal])


    // Item added in car notify
    const notify = () => toast(
        <div class="">
            <span>Item added in cart.</span>
            <a href='/cart' className="btn btn-outline-info btn-sm text-center ms-4 px-3 ">View Cart</a>
        </div>
    );

    // Add item in cart
    const addItemInCart = () => {
        setItem({
            name: product.title,
            price: product.price,
            for: product.for,
            categories: product.categories,
            id: product.id,
            img: product.imgs[0],
            qty: quantity,
            size: product?.sizes ? size : null
        })
        notify()
    }


    return (
        <div className="productDetailComp">
            {/* item added in cart notification panel. */}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={true}
                rtl={false}
            />

            <div className="container">
                {/*  */}
                <div class="position-fixed bottom-0 end-0 p-3" style={{ zIndex: "100000000" }}>
                    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <img src="..." class="rounded me-2" alt="..." />
                            <strong class="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            Hello, world! This is a toast message.
                        </div>
                    </div>
                </div>
            </div>

            <div className={modal ? " " : "container"}>
                {
                    product ?
                        <>
                            <div className="productDetail row">
                                <div className="col-md-7 text-center pe-3 mt-5">
                                    <div className="pd-images-carousel">
                                        <div className="pd-images-carousel-items">
                                            {
                                                modal ?
                                                    <>
                                                        <div className="pd-detail-featured-img">
                                                            <img src={image} class="d-block w-100 pd-detail-sleeted-img mb-4 img-fluid" style={{ margin: "0 auto" }} alt="..." />
                                                        </div>
                                                        {
                                                            <div className="pd-images-carousel-thumbnails d-flex my-3">
                                                                {
                                                                    product?.imgs.map(dt => (
                                                                        <div onClick={() => { setImage(dt); setCarouselActive(product?.imgs.indexOf(dt)) }} className={product?.imgs.indexOf(dt) === carouselActive ? "pd-images-carousel-thumbnail-item thumbnail-item-active me-2 thumbnail-item-" + product?.imgs.indexOf(dt) : "pd-images-carousel-thumbnail-item me-2 thumbnail-item-" + product?.imgs.indexOf(dt)}>
                                                                            <img src={dt} alt="" className="img-fluid thumbnail-item-img" />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        }
                                                    </>
                                                    :
                                                    <div class="pd-images-carousel-item carousel-item-active" >
                                                        {
                                                            product?.imgs.map(dt => (
                                                                <img src={dt} class="d-block w-100 carousel-item-img mb-4" style={{ margin: "0 auto" }} alt="..." />
                                                            ))
                                                        }
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 ps-5 productDetailText">
                                    <div className="sticky-top pt-5">
                                        <h2 className="mb-4 product-detail-title">{product?.title}</h2>
                                        <div className="productDetailPriceAndReviews d-flex">
                                            <div className="productDetailPrice me-auto">$ {product?.price}</div>
                                            <div className="productDetailReviews me-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star me-3" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                </svg>
                                                <span> 7 REVIEWS</span>
                                            </div>
                                        </div>
                                        <div className="product-detail-description mt-3">
                                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                        </div>
                                        {
                                            product?.sizes === null ? "" :
                                                <div className="productDetailSizes d-flex mt-4">
                                                    <h4>Sizes: </h4>
                                                    <select onChange={(e) => setSize(e.target.value)} class="ms-2 form-select form-select-sm" style={{ width: "35%" }} aria-label="Default select example">
                                                        {
                                                            product?.sizes.map(dt => (
                                                                <option value={dt}>{dt}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                        }
                                        <div className="product-detail-quantity-and-add-cart d-flex mt-4">
                                            <input type="text" value={quantity} className="product-detail-quantity" />
                                            <div className="quantityUpDownBtn">
                                                <button onClick={() => setQuantity(quantity + 1)} className="quantityUpBtn">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="quantityDownBtn">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button onClick={addItemInCart} className="product-detail-add-cart-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                </svg>
                                                <span ms-2> Add To Cart</span></button>
                                        </div>
                                        <div className="productDetailAddToWishlist">
                                            <button className="btn btn-link mt-3" style={{ color: "#FF6B33" }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                </svg>
                                                <span className="ms-2">Add To Wishlist</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                modal ?
                                    ""
                                    :
                                    <div className="productDetailRelatedProducts">
                                        <h3 className="mt-5 mb-3 productDetailRelatedProductsTitle">You might also like these</h3>
                                        {
                                            relatedProducts ?
                                                <div className="productDetailRelatedProductItems container">
                                                    <div className="">
                                                        {
                                                            relatedProducts?.map(dt => (
                                                                <div className="col-3 me-3 productDetailRelatedProductItem mb-5">
                                                                    <Product productData={dt} />
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                                :
                                                <div className="relatedProductsLoader my-5">
                                                    <div className="text-center py-5">
                                                        <div class="spinner-border text-secondary" role="status">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }
                        </>
                        :
                        <div className="productDetailLoader text-center">
                            <div class="spinner-border text-secondary" style={{ margin: "200px 0" }} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default ProductDetail;