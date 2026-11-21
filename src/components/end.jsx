import React from "react";

function End() {
    return (
        <div className="end">
            <div className="end-body">
                <div className="end-company-section">
                    <div className="company-name">AyEstate</div>
                    <div className="end-company-contact">
                        <div className="company-contact">
                            <div>hello.ayestate@example.com</div>
                            <div>(+1) 2345 6789</div>
                        </div>
                        <div className="company-address">
                            <div>4140 Parker Rd. Allentown,</div>
                            <div>New Mexico 31134</div>
                        </div>
                    </div>
                </div>
                <div className="end-links-section">
                    <div className="link-column">
                        <h2>Pages</h2>
                        <ul>
                            <li>Listings</li>
                            <li>About US</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h2>Support</h2>
                        <ul>
                            <li>Properties</li>
                            <li>FAQ</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h2>Webflow Stuff</h2>
                        <ul>
                            <li>Style Guide</li>
                            <li>Changelog</li>
                            <li>Licensing</li>
                            <li>Instruction</li>
                        </ul>
                    </div>
                    <div className="link-column">
                        <h2>Plat form</h2>
                        <ul>
                            <li>Official WEbsite</li>
                            <li>Play Store</li>
                            <li>App Store</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer">
                Copyright © AyEstate | Designed by AY Studio
            </div>
        </div>
    );
}

export default End;