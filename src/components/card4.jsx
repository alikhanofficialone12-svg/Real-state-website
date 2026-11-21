import React from "react";
import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Card4 = ({ name, type, description, price, image, date }) => {
    const formatDate = (firebaseTimestamp) => {
        try {
            if (!firebaseTimestamp) return "N/A";

            let dateObj;

            // Handle Firebase Timestamp object
            if (firebaseTimestamp.toDate && typeof firebaseTimestamp.toDate === 'function') {
                dateObj = firebaseTimestamp.toDate();
            }
            // Handle Date object
            else if (firebaseTimestamp instanceof Date) {
                dateObj = firebaseTimestamp;
            }
            // Handle string
            else if (typeof firebaseTimestamp === 'string') {
                dateObj = new Date(firebaseTimestamp);
            }
            // Handle number (timestamp)
            else if (typeof firebaseTimestamp === 'number') {
                dateObj = new Date(firebaseTimestamp);
            }
            else {
                return "N/A";
            }

            // Check if dateObj is valid
            if (isNaN(dateObj.getTime())) {
                return "N/A";
            }

            return dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        } catch (error) {
            console.error("Error formatting date:", error);
            return "N/A";
        }
    };

    const navigate = useNavigate();

    const serializeDate = (firebaseTimestamp) => {
        if (!firebaseTimestamp) return null;
        if (firebaseTimestamp.toDate && typeof firebaseTimestamp.toDate === 'function') {
            return firebaseTimestamp.toDate().toISOString();
        }
        if (firebaseTimestamp instanceof Date) {
            return firebaseTimestamp.toISOString();
        }
        if (typeof firebaseTimestamp === 'string' || typeof firebaseTimestamp === 'number') {
            return firebaseTimestamp;
        }
        return null;
    };

    const handleCardClick = () => {
        navigate("/detail", {
            state: {
                name,
                type,
                description,
                price,
                image,
                date: serializeDate(date),
                Date: serializeDate(date)
            }
        });
    };

    return (
        <div className="card"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}>
            <div className="card--image"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "10px",
                    height: "350px",
                    width: "320px",
                }}> </div>
            <div className="recent-meta">
                <div className="recent-date">{formatDate(date)}</div>
                <div className="dot-icon"><LuDot /></div>
                <div className="recent-category">{type}</div>
            </div>
            <div className="recent-title"
                style={{ display:"flex" , justifyContent:"center" , alignItems:"center" , fontSize:"28px" , fontWeight:"bold"}}>
                {name}
            </div>
            <p>
                {description}
            </p>
            <div className="price">
                Rs: {price?.toLocaleString() || 0}
            </div>
            <div className="view-details-container">
                <button className="view-details">View Details</button>
            </div>
        </div>
    );
};

export default Card4;