import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import './GenderPage.css';


const GenderPage = ({ gender }) => {

    const [genderCategories, setGenderCategories] = useState(null)

    const path = window.location.pathname

    // Get data form db
    useEffect(() => {
        fetch(`https://arcane-sierra-30035.herokuapp.com/categories/${gender}`)
            .then(res => res.json())
            .then(data => {
                setGenderCategories(data)
            })
            .catch(err => {

            })
    }, [gender])

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    return (
        <div className="genderPageComp">
            {
                path.slice(1, 20) === "men" || "women" ?
                    <>
                        <div style={{ backgroundImage: `url(${path.slice(1, 20) === "men" ? "https://images.pexels.com/photos/999267/pexels-photo-999267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" : path.slice(1, 20) === "women" ? "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" : ""}` }} className="genderPageBanner mb-5">
                            <h1 className="genderPageBannerTitle text-uppercase text-center">{path.slice(1, 20)}'s</h1>
                        </div>
                    </>
                    :
                    ""
            }
            {
                genderCategories ?
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-3 ps-5">
                                <h1 className="pt-5 ps-5 mb-4">Shop By Categories</h1>
                            </div>
                            <div className="col-md-9 mb-5">
                                {
                                    genderCategories ?
                                        <Slider className="sliderItem" {...sliderSettings}>
                                            {
                                                genderCategories.map(dt =>
                                                    <div>
                                                        <Link style={{ textDecoration: "none" }} to={"/" + dt.for + "/" + dt.category} className="col-5 text-dark genderCategoryItem">
                                                            <div className="genderPageCategory">
                                                                <img src={dt?.img} alt="" className="img-fluid" />
                                                                <h3 className="mt-4">{dt?.category}</h3>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                        </Slider>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    </div>
                    :
                    ""
            }
        </div>
    );
};

export default GenderPage;