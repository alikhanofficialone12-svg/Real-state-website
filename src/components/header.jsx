import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, useAuth } from "../firebase";

function Header() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const isAdmin = role === "admin";

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

    return (
        <header>
            <div className="header-content">
                AyEstate
            </div>
            <div className="header-links">
                <Link to="/">Home</Link>
                <Link to="/listings">Listings</Link>
                <Link to="/company">Company</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/about">About US</Link>
                <Link to="/contact">Contact Us</Link>
                {isAdmin ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" }}>
                        <span style={{ fontWeight: 600 }}>Admin</span>
                        <button onClick={handleLogout} style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #dc3545", background: "#fff", color: "#dc3545", cursor: "pointer" }}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: "8px", marginLeft: "8px" }}>
                        <Link to="/login" style={{ padding: "6px 12px", borderRadius: "6px", background: "#0d6efd", color: "#fff", textDecoration: "none" }}>
                            Admin Login
                        </Link>
                    </div>
                )}
            </div>
            {isAdmin && (
                <div className="header-btn">
                    <Link to="/add-product">
                        <button>Add Property</button>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;