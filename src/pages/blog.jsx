import React from "react";
import Header from "../components/header";
import { CiSearch } from "react-icons/ci";
import { LuDot } from "react-icons/lu";
import Image11 from "../assets/image copy 11.png";
import Image13 from "../assets/image copy 13.png";
import End from "../components/end";
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const Navigate = useNavigate();

    const handleReadMore = () => {
        Navigate("/articles");
    }

    return (
        <div className="blog-page">
            <Header />

            <div className="blog-container">

                {/* Hero Section */}
                <div className="blog-hero">
                    <div className="blog-title">Our Blog</div>

                    <div className="blog-search">
                        <div className="search-icon"><CiSearch /></div>
                        <input className="search-input" type="text" placeholder="Search article name" />
                        <button className="search-btn">Search</button>
                    </div>

                    <div className="blog-suggestions">
                        <div className="suggested-label">Suggested:</div>
                        <div className="suggestion-item">Success Stories</div>
                        <div className="suggestion-item">Invest Strategies</div>
                        <div className="suggestion-item">Tips</div>
                        <div className="suggestion-item">Success Story</div>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="blog-featured">

                    <div className="featured-main">
                        <div className="featured-meta">
                            <div className="featured-dates">
                                <div className="featured-date">8 February 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="featured-date">Success Stories</div>
                            </div>
                            <div className="featured-title">
                                From $0 to $40 Million: How a 10-Year Old Orphan Became a Successful Investor
                            </div>
                        </div>
                    </div>

                    <div className="featured-list">

                        <div className="featured-card">
                            <div className="card-image">
                                <img src={Image11} alt="" />
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <div className="card-date">2 Feb 2024</div>
                                    <div className="dot-icons"><LuDot /></div>
                                    <div className="card-category">Invest Strategies</div>
                                </div>
                                <div className="featured-card-title">
                                    The Quick Guide to Virtual House Flipping
                                </div>
                            </div>
                        </div>

                        <div className="featured-card">
                            <div className="card-image">
                                <img src={Image11} alt="" />
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <div className="card-date">21 Feb 2023</div>
                                    <div className="dot-icons"><LuDot /></div>
                                    <div className="card-category">Tips</div>
                                </div>
                                <div className="featured-card-title">
                                    The Quick Guide to Virtual House Flipping
                                </div>
                            </div>
                        </div>

                        <div className="featured-card">
                            <div className="card-image">
                                <img src={Image11} alt="" />
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <div className="card-date">2 Feb 2024</div>
                                    <div className="dot-icons"><LuDot /></div>
                                    <div className="card-category">Invest Strategies</div>
                                </div>
                                <div className="featured-card-title">
                                    The Quick Guide to Virtual House Flipping
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Popular Articles */}
                <div className="popular-section">

                    <div className="section-header">
                        <div className="section-text">
                            <div className="section-title">Popular Articles</div>
                            <div className="section-subtitle">
                                We provide blog that help start your career on AyEstate
                            </div>
                        </div>
                        <div className="section-action">
                            <button className="view-btn btn btn-outline-dark" onClick={handleReadMore}>View All</button>
                        </div>
                    </div>

                    <div className="popular-list">
                        <div className="popular-card">
                            <div className="popular-dates">
                                <div className="popular-date">8 February 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="popular-date">Success Stories</div>
                            </div>
                            <div className="popular-title">
                                Luxury Living: Exploring High-End Real Estate Markets
                            </div>
                            <div className="popular-desc">
                                Feeling like work is a constant source of stress? You’re not...
                            </div>
                        </div>

                        <div className="popular-card">
                            <div className="popular-dates">
                                <div className="popular-date">8 February 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="popular-date">Success Stories</div>
                            </div>
                            <div className="popular-title">
                                Short vs. Long-Term Real Estate Investing
                            </div>
                            <div className="popular-desc">
                                Whether you’re speaking with the recruiter or you're final...
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="recent-section">

                    <div className="section-header">
                        <div className="section-text">
                            <div className="section-title">Recent Articles</div>
                            <div className="section-subtitle">
                                Newest update article from AyEstate
                            </div>
                        </div>
                        <div className="section-action">
                            <button className="view-btn btn btn-outline-dark" onClick={handleReadMore}>View All</button>
                        </div>
                    </div>

                    <div className="recent-list">

                        <div className="recent-card">
                            <div className="recent-image">
                                <img src={Image13} alt="" />
                            </div>
                            <div className="recent-meta">
                                <div className="recent-date">2 Feb 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="recent-category">Invest Strategies</div>
                            </div>
                            <div className="recent-title">
                                15 Reasons Why Real Estate is the Best Investment
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-image">
                                <img src={Image13} alt="" />
                            </div>
                            <div className="recent-meta">
                                <div className="recent-date">2 Feb 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="recent-category">Invest Strategies</div>
                            </div>
                            <div className="recent-title">
                                Renters Are Still Moving—These Markets Are Where You Should Be Investing
                            </div>
                        </div>

                        <div className="recent-card">
                            <div className="recent-image">
                                <img src={Image13} alt="" />
                            </div>
                            <div className="recent-meta">
                                <div className="recent-date">2 Feb 2024</div>
                                <div className="dot-icon"><LuDot /></div>
                                <div className="recent-date">Invest Strategies</div>
                            </div>
                            <div className="recent-title">
                                Every Major U.S. City Where It’s More Expensive to Rent Than Buy
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <End/>
        </div>
    );
};

export default Blog;