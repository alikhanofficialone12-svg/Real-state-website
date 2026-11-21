import React from "react";
import Image9 from "../assets/image copy 9.png";
import { IoLogoLinkedin } from "react-icons/io";
import { PiXLogoBold } from "react-icons/pi";
import { FaDribbble } from "react-icons/fa";

export default function Creater(props) {
    return (
        <div className="creater-card">
            <div className="creater-image">
                <img src={Image9} alt="" />
            </div>
            <div className="creater-info">
                <div className="creater-name">
                    {props.name}
                </div>
                <div className="creater-rank">
                    {props.rank}
                </div>
            </div>
            <div className="creater-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
            </div>
            <div className="creater-socials">
                <div className="social-icon">
                    <IoLogoLinkedin />
                </div>
                <div className="social-icon">
                    <PiXLogoBold />
                </div>
                <div className="social-icon">
                    <FaDribbble />
                </div>
            </div>
        </div>
    )
}