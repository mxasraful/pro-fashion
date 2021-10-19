import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footerComp">
            <div className="footerTop py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <h5 className="mt-5 mb-4 tex-bold">Subscribe To Newsletter</h5>
                            <div className="text-secondary mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At itaque temporibus.</div>
                            <form action="" className="footerNewsletterForm d-flex">
                                <input type="email" placeholder="Your Email" style={{ borderRadius: "0", width: "90%", borderBottom: "1px solid #000", borderTop: "0", borderLeft: "0", borderRight: "0" }} className="form-control" />
                                <button style={{ marginLeft: "-50px" }} type="submit" className="btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-2">
                            <h5 className="mt-5 mb-4 ms-3 tex-bold">Shop</h5>
                            <ul class="list-inline">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/men">For Men</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/women">For Women</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/blog">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-2 px-4">
                            <h5 className="mt-5 mb-4 ms-3 tex-bold">Women</h5>
                            <ul class="list-inline">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/women/shoes">Shoes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/women/saree">Saree</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-2 ps-4">
                            <h5 className="mt-5 mb-4 ms-3 tex-bold">Men</h5>
                            <ul class="list-inline">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/men/shirts">Shirt</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/men/t-shirt">T-Shirt</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/men/panjabi">Panjabi</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active" href="/men/coaty">Coaty</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mainFooter">
                <div className="container d-flex py-4">
                    <h6 className="me-auto">©{new Date().getFullYear()} <a className="text-dark" href="http://asrafulweb.com"> AsrafulWeb</a> All rights reserved.</h6>
                    <div className="">
                        <Link className="me-3 text-secondary" to="">Terms & Conditions</Link>
                        <Link className="text-secondary" to="">Privacy & cookies</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;