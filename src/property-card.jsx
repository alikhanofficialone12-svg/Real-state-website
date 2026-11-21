import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuHouse } from "react-icons/lu";
import { GiBathtub } from "react-icons/gi";
import { MdOutlineHotel } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";

function PropertyCard() {
    return (
        <div className="property-card">
            <div className="card-header">
                <div className="card-featured">
                    Featured
                </div>
                <div className="card-favorite">
                    <IoIosHeartEmpty />
                </div>
            </div>
            <div className="card-price">
                $300,000,000 / year / leasehold
            </div>
            <div className="card-title">
                Villa Cozy Cottage
            </div>
            <div className="card-location">
                Bali, Indonesia
            </div>
            <div className="card-features">
                <div className="feature-item">
                    <LuHouse />
                    Villa
                </div>
                <div className="feature-item">
                    <GiBathtub />
                    2
                </div>
                <div className="feature-item">
                    <MdOutlineHotel />
                    4
                </div>
                <div className="feature-item">
                    <SlSizeFullscreen />
                    1400 m2
                </div>
                <div className="feature-item">
                    <MdOutlineHotel />
                    4
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;