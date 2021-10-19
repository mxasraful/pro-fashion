import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    return (
        <div className="container">
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://www.aarong.com/media/catalog/category/t_shoirt_men.jpg" class="d-block w-100" style={{ float: "right" }} alt="..." />
                        <div style={{ float: "left", textAlign: "left", top: "100px" }} class="carousel-caption d-none d-md-block">
                            <h3 className="text-dark mb-4">T-Shirt for men</h3>
                            <Link to="/men/t-shirt" className="btn btn-outline-info px-4 btn-sm">See More</Link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.aarong.com/media/catalog/category/Newarrivals_women_2.jpg" class="d-block w-100" style={{ float: "left" }} alt="..." />
                        <div style={{ float: "right", textAlign: "right", top: "100px" }} class="carousel-caption d-none d-md-block">
                            <h3 className="text-dark mb-4">Saree for women</h3>
                            <Link to="/women/saree" className="btn btn-outline-info px-4 btn-sm">See More</Link>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="https://www.aarong.com/media/catalog/category/04.png" class="d-block w-100" style={{ float: "right" }} alt="..." />
                        <div style={{ float: "left", textAlign: "left", top: "100px" }} class="carousel-caption d-none d-md-block">
                            <h3 className="text-dark mb-4">Panjabi for men</h3>
                            <Link to="/men/panjabi" className="btn btn-outline-info px-4 btn-sm">See More</Link>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Banner;