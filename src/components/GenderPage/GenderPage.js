import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './GenderPage.css';


const GenderPage = ({ gender }) => {

    const [genderCategories, setGenderCategories] = useState(null)

    // Get data form db
    useEffect(() => {
        fetch(`http://localhost:3001/categories/${gender}`)
            .then(res => res.json())
            .then(data => {
                setGenderCategories(data)
            })
            .catch(err => {

            })
    }, [gender])

    // Slider responsive settings
    const sliderResponsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    console.log(genderCategories)

    return (
        <div className="genderPageComp">
            {
                gender === "men" || "women" ?
                    <>
                        <div style={{ backgroundImage: `url(${gender === "men" ? "https://images.pexels.com/photos/999267/pexels-photo-999267.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" : gender === "women" ? "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" : ""}` }} className="genderPageBanner mb-5">
                            <h1 className="genderPageBannerTitle text-uppercase text-center">{gender}'s</h1>
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
                                        <Slider className="sliderItem" responsive={sliderResponsive}>
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