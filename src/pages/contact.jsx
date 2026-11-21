import React from "react";
import Header from "../components/header";
import Image10 from "../assets/image copy 10.png";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import End from "../components/end";

export default function Contact() {
    return (
        <div className="contact-page">
            <Header />
            <div className="contact-hero">
                <div className="contact-hero-text">
                    <h1>
                        Excelent customer service
                    </h1>
                    <p>
                        If you have any questions you can report them below with the following information, so that it is easy for us to reply to your message.
                    </p>
                </div>
                <div className="contact-hero-image">
                    <img src={Image10} alt="" />
                </div>
            </div>
            <div className="contact-services">
                <div className="service-card">
                    <div className="service-icon"><CiMail /></div>
                    <div className="service-title">Email Us</div>
                    <div className="service-description">Ask us a question by email and we will respond within a few days.</div>
                    <div className="service-link">Leave a Messages</div>
                </div>
                <div className="service-card">
                    <div className="service-icon"><CiLocationOn /></div>
                    <div className="service-title">Official Office</div>
                    <div className="service-description">You can meet us at our office and discuss the details of your question.</div>
                    <div className="service-link">Get Directions</div>
                </div>
                <div className="service-card">
                    <div className="service-icon"><BiSupport /></div>
                    <div className="service-title">Customer Support</div>
                    <div className="service-description">Call us if your question requires an immediate response.</div>
                    <div className="service-link">+(632) 3892402</div>
                </div>
            </div>
            <div className="contact-form-section">
                <div className="contact-form-header">
                    <h1>Contact our sales team</h1>
                    <p>
                        Built for every team across your company, Jobify Enterprise boosts productivity with
                        upgraded security and account support. Contact us today to unlock:
                    </p>
                </div>
                <div className="container">
                    <div className="form-box">
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Your Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" placeholder="Enter your name" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" placeholder="Enter your email" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label m-3">Phone Number</label>
                                    <input type="text" className="form-control" placeholder="Enter your phone number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label m-3">How Can Our Sales Team Help? <span className="text-danger">*</span></label>
                                    <select className="form-select" required>
                                        <option selected disabled>Choose company size</option>
                                        <option>1-10</option>
                                        <option>11-50</option>
                                        <option>51-200</option>
                                        <option>200+</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label m-3">Anything Else You’d Like Us To Know?</label>
                                    <textarea className="form-control" rows="4" placeholder="Type anything"></textarea>
                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <input className="form-check-input me-2 m-3" type="checkbox" required />
                                    <label className="form-check-label">
                                        I agree to Terms of Service and Privacy Policy.*
                                    </label>
                                </div>
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-custom">
                                        Contact Sales
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <End />
        </div>
    );
}