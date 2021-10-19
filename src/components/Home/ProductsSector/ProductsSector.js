import React from 'react';
import { Link } from 'react-router-dom';
import './ProductsSector.css'

const ProductsSector = () => {
    return (
        <div className="homeProductsSectorComp py-5 my-5">
            <img src="" alt="" className="img-fluid " />
            <img src="" alt="" className="img-fluid " />
            <div className="container">
                <div className="row homeBigGenderItems">
                    <Link to="/men" className="col-md-6 mb-5" style={{height: "400px"}}>
                        <div className="d-flex align-items-center justify-content-center w-100 h-100" style={{ background: "url(https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)" }}>
                            <h1 className="homeBigGenderItemText">MEN</h1>
                        </div>
                    </Link>
                    <Link to="/women" className="col-md-6" style={{height: "400px"}}>
                        <div className="d-flex align-items-center justify-content-center w-100 h-100" style={{ background: "url(https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)" }}>
                            <h1 className="homeBigGenderItemText">WOMEN</h1>
                        </div>
                    </Link>
                </div>
            </div>
            <br />
        </div>
    );
};

export default ProductsSector;