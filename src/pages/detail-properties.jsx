import React from "react";
import Header from "../components/header";
import Image7 from "../assets/image copy 7.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import End from "../components/end";

function DetailProperties() {
    return (
        <div className="detail-properties">
            <Header />
            <div className="detail-properties__body">
                <div className="detail-properties__summary">
                    <div className="detail-properties__hero">
                        <div className="detail-properties__title">
                            Luxury Beach Villa
                        </div>
                        <div className="detail-properties__description">
                            Experience the ultimate in beachfront luxury with breathtaking ocean views.
                        </div>
                        <div className="detail-properties__tags">
                            <button>Beachfront</button>
                            <button>Modern</button>
                            <button>Spacious</button>
                        </div>
                    </div>
                    <div className="detail-properties__metadata">
                        <div className="detail-properties__metadata-item">
                            <div className="detail-properties__metadata-label">Client</div>
                            <div className="detail-properties__metadata-value">John Doe</div>
                        </div>
                        <div className="detail-properties__metadata-item">
                            <div className="detail-properties__metadata-label">Date</div>
                            <div className="detail-properties__metadata-value">March 2023</div>
                        </div>
                        <div className="detail-properties__metadata-item">
                            <div className="detail-properties__metadata-label">Location</div>
                            <div className="detail-properties__metadata-value">Bali, Indonesia</div>
                        </div>
                        <div className="detail-properties__metadata-item">
                            <div className="detail-properties__metadata-label">Price</div>
                            <div className="detail-properties__metadata-value">$3,000,000</div>
                        </div>
                    </div>
                </div>
                <div className="detail-properties__image">
                    <img src={Image7} alt="" />
                </div>
                <br />
                <div className="detail-properties__info-placeholder">
                    <div className="detail-properties__info-content">
                        <h2>
                            Stunning Property with Luxurious Amenities
                        </h2>
                        <p>
                            Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
                        </p>
                        <p>
                            Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
                        </p>
                        <p>
                            Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.
                        </p>
                    </div>
                    <div className="detail-properties__gallery">
                        <div className="detail-properties__gallery-item">
                            <img src={Image7} alt="" />
                        </div>
                        <div className="detail-properties__gallery-item">
                            <img src={Image7} alt="" />
                        </div>
                        <div className="detail-properties__gallery-item">
                            <img src={Image7} alt="" />
                        </div>
                    </div>
                </div>
                <div className="detail-properties__action-placeholder">
                    <div className="detail-properties__action-content">
                        <div className="detail-properties__action-badge">Luxury</div>
                        <h2>
                            Experience the Perfect Blend of Comfort and Style
                        </h2>
                        <p>
                            Welcome to our stunning property! With a beautiful image gallery, immersive virtual tour, and outstanding features, this is the perfect place to call home. Explore the spacious rooms, modern amenities, and convenient location that make this property truly exceptional.
                        </p>
                        <div className="home-part-2-content-3">
                            <button className="learn-more-button" style={{ backgroundColor: "#B7E08A", borderColor: "transparent" }}>Learn More</button>
                            <button className="contact-button">
                                Contact <MdKeyboardArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="detail-properties__action-image">
                        <img src={Image7} alt="" />
                    </div>
                </div>
            </div>
            <End />
        </div>
    );
}

export default DetailProperties;