import React from "react";
import Header from "../components/Header";
import End from "../components/End";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiLineVerticalLight } from "react-icons/pi";
import { BsBoxSeamFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import PropertyCard from "../property-card";


function Listings() {
    return (
        <div className="listings">
            <Header />
            <div className="content">
                <div className="breadcrumb">
                    <div className="breadcrumb-item">Home</div>
                    <div className="breadcrumb-arrow"><MdKeyboardArrowRight /></div>
                    <div className="breadcrumb-item">Real Estate</div>
                    <div className="breadcrumb-arrow"><MdKeyboardArrowRight /></div>
                    <div className="breadcrumb-villa">Villa</div>
                </div>
                <br />
                <br />
                <div className="listings-header">
                    <div className="title-section">
                        <div className="main-title">
                            Showing listings properties for “Villa”
                        </div>
                        <div className="subtitle">
                            Showing 1 - 60 Properties
                        </div>
                    </div>
                    <div className="sort-section">
                        <div className="sort-label">Sort By:</div>
                        <div className="sort-select">
                            <select name="" id="">
                                <option value="">
                                    Relevant Products
                                </option>
                            </select>
                        </div>
                        <div className="sort-separator">
                            <PiLineVerticalLight />
                        </div>
                        <div className="view-box">
                            <BsBoxSeamFill />
                        </div>
                        <div className="view-menu">
                            <IoMenu />
                        </div>
                    </div>
                </div>
                <div className="listings-body">
                    <div className="filter-sidebar">
                        <h1 className="sidebar-title">Filter Option</h1>
                        <hr />
                        <br />

                        <section className="filter-group">
                            <div className="group-header">
                                <h3>Best Filter</h3>
                                <i className="ph ph-caret-up"></i>
                            </div>
                            <div className="filter-options">
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    <span className="label-text"><i className="ph-fill ph-star" style={{ color: '#FFB347' }}></i> 4 stars or upper</span>
                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    <span className="label-text">Luxury Building</span>
                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    <span className="label-text">Best Seller</span>
                                </label>
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    <span className="label-text">Discount</span>
                                </label>
                            </div>
                        </section>
                        <br />
                        <hr />
                        <br />

                        <section className="filter-group">
                            <div className="group-header">
                                <h3>Location</h3>
                                <i className="ph ph-caret-up"></i>
                            </div>
                            <div className="filter-options">
                                <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Bandung</label>
                                <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Jakarta</label>
                                <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Bali</label>
                                <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Medan</label>
                                <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Surabaya</label>
                                <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Jogja</label>
                                <a href="#" className="show-all">Show All</a>
                            </div>
                        </section>

                        <br />
                        <hr />
                        <br />

                        <section className="filter-group">
                            <div className="group-header">
                                <h3>Category</h3>
                                <i className="ph ph-caret-up"></i>
                            </div>
                            <div className="filter-options category-list">
                                <div className="category-item">
                                    <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> House</label>
                                    <i className="ph ph-caret-up"></i>
                                </div>
                                <div className="category-item">
                                    <label className="checkbox-container"><input type="checkbox" /><span className="checkmark"></span> Villa</label>
                                    <i className="ph ph-caret-up"></i>
                                </div>
                                <a href="#" className="show-all">Show All Categories</a>
                            </div>
                        </section>

                        <br />
                        <hr />
                        <br />

                        <section className="filter-group">
                            <div className="group-header">
                                <h3>Price Range</h3>
                                <i className="ph ph-caret-up"></i>
                            </div>
                            <div className="price-inputs">
                                <div className="input-row">
                                    <select><option>USD</option></select>
                                    <input type="text" placeholder="Minimum price" />
                                </div>
                                <div className="input-row">
                                    <select><option>USD</option></select>
                                    <input type="text" placeholder="Maximum price" />
                                </div>
                            </div>
                            <div className="price-pills">
                                <button className="pill">$0 - $5,000</button>
                                <button className="pill">$5,000 - $50,000</button>
                                <button className="pill">&gt; $50,000</button>
                            </div>
                        </section>
                    </div>
                    <div className="property-listings">
                        <div className="property-cards">
                            <PropertyCard />
                            <PropertyCard />
                            <PropertyCard />
                            <PropertyCard />
                            <PropertyCard />
                            <PropertyCard />
                        </div>
                        <br />
                        <div className="pagination">
                            <button>1</button>
                            <button>2</button>
                            <button>...</button>
                            <button>27</button>
                            <button style={{fontSize:"16px",color:"#1D9E34" }}><FaChevronRight /></button>
                        </div>
                    </div>
                </div>
            </div>
            <End />
        </div>
    );
}

export default Listings;