import React from "react";
import Header from "../components/header";
import Image8 from "../assets/image copy 8.png";
import Creater from "../components/creater";
import { FaAward } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import BeforeEnd from "../components/before-end";
import End from "../components/end";

function About() {
    return (
        <div className="about">
            <Header />
            <div className="image-section">
                <img src={Image8} alt="" />
            </div>
            <br /><br /><br />
            <div className="about-content">
                <div className="stats-section">
                    <div className="stat-item">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Succesfull Project</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">600+</div>
                        <div className="stat-label">Satisfied Client</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">150+</div>
                        <div className="stat-label">Awwards Winners</div>
                    </div>
                </div>
                <div className="about-description">
                    We’re a diverse group of real estate agent with different skills who make things people love to use. We help the world’s most solve problems and generate growth real estate.
                </div>
            </div>
            <div className="team-section">
                <div className="team-header">
                    <div className="team-title">Our team</div>
                    <div className="team-subtitle">meet our creative team</div>
                    <div className="team-description">
                        Magna metus, adipiscing dictumst magna fringilla metus fermentum tristique. Enim vitae purus lectus augue maecenas
                    </div>
                </div>
                <div className="creators-list">
                    <Creater name="Muhammad Abubakar A." rank="Director" />
                    <Creater name="Alexander Isak" rank="CEO" />
                    <Creater name="Christina W." rank="Manager" />
                    <Creater name="Brian Oconner" rank="Supervisor" />
                    <Creater name="Natalie A." rank="Creative Directer" />
                    <Creater name="Hengky Doe" rank="Developers" />
                    <Creater name="Anna Withanna" rank="Marketing" />
                    <Creater name="Setya Wijayanti" rank="Content Creator" />
                </div>
            </div>
            <div className="achievements-companies-section">
                <div className="achievement-title">
                    Achievement
                </div>
                <div className="award-content">
                    <div className="award-subtitle">Our award this year</div>
                    <div className="award-description">
                        We’re happy to receive this award so that it motivates us to grow and provide the best service for you.
                    </div>
                </div>
                <div className="award-body">
                    <div className="awards-list">
                        <div className="award-item">
                            <div className="award-icon">
                                <FaAward />
                            </div>
                            <div className="award-title">
                                Best Small Companies
                            </div>
                            <div className="award-descrip">
                                Elit ornare nibh dictum viverra quam placerat. Lobortis eleifend risus pretium consectetur eros.
                            </div>
                        </div>
                        <div className="award-item">
                            <div className="award-icon">
                                <FaAward />
                            </div>
                            <div className="award-title">
                                Fast Company Growth
                            </div>
                            <div className="award-descrip">
                                Elit ornare nibh dictum viverra quam placerat. Lobortis eleifend risus pretium consectetur eros.
                            </div>
                        </div>
                        <div className="award-item">
                            <div className="award-icon">
                                <FaAward />
                            </div>
                            <div className="award-title">
                                Best Developer Team
                            </div>
                            <div className="award-descrip">
                                Elit ornare nibh dictum viverra quam placerat. Lobortis eleifend risus pretium consectetur eros.
                            </div>
                        </div>
                    </div>
                    <div className="view-project">
                        <button className="view-project-btn ">
                            View All Project
                            <GoArrowUpRight />
                        </button>
                    </div>
                </div>
                <div className="companies-info">
                    <div className="companies-title">
                        We’ve built with the most growth company around the world
                    </div>
                    <div className="companies-logos">
                        <div className="company-logo">facebook</div>
                        <div className="company-logo">NETFLIX</div>
                        <div className="company-logo">amazon</div>
                        <div className="company-logo">
                            <FaYoutube />
                            YouTube
                        </div>
                        <div className="company-logo">Google</div>
                    </div>
                </div>
            </div>
            <BeforeEnd/>
            <End/>
        </div>
    );
}

export default About;