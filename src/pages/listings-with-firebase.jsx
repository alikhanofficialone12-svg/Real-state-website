import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import End from "../components/End";
import { propertyService } from "../services/propertyService";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiLineVerticalLight } from "react-icons/pi";
import { BsBoxSeamFill } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";

function ListingsWithFirebase() {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        category: "Villa",
        location: "",
        minPrice: "",
        maxPrice: "",
        rating: 0
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await propertyService.fetchProperties();
            setProperties(data);
            applyFilters(data);
        } catch (err) {
            setError("Failed to load properties");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = (propertiesToFilter) => {
        let filtered = propertiesToFilter;

        if (filters.category) {
            filtered = filtered.filter(p => p.category === filters.category);
        }
        if (filters.location) {
            filtered = filtered.filter(p => p.location === filters.location);
        }
        if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
        }
        if (filters.rating > 0) {
            filtered = filtered.filter(p => p.rating >= filters.rating);
        }

        setFilteredProperties(filtered);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        applyFilters(properties);
    };

    if (loading) return <div className="listings"><Header /><div>Loading properties...</div><End /></div>;
    if (error) return <div className="listings"><Header /><div>{error}</div><End /></div>;

    return (
        <div className="listings">
            <Header />
            <div className="content">
                <div className="breadcrumb">
                    <div className="breadcrumb-item">Home</div>
                    <div className="breadcrumb-arrow"><MdKeyboardArrowRight /></div>
                    <div className="breadcrumb-item">Real Estate</div>
                    <div className="breadcrumb-arrow"><MdKeyboardArrowRight /></div>
                    <div className="breadcrumb-villa">{filters.category}</div>
                </div>
                <br />
                <br />
                <div className="listings-header">
                    <div className="title-section">
                        <div className="main-title">
                            Showing listings properties for "{filters.category}"
                        </div>
                        <div className="subtitle">
                            Showing 1 - {filteredProperties.length} Properties
                        </div>
                    </div>
                    <div className="sort-section">
                        <div className="sort-label">Sort By:</div>
                        <div className="sort-select">
                            <select name="" id="">
                                <option value="">Relevant Products</option>
                                <option value="">Price: Low to High</option>
                                <option value="">Price: High to Low</option>
                                <option value="">Newest</option>
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
                                <h3>Category</h3>
                            </div>
                            <div className="filter-options">
                                <select 
                                    name="category" 
                                    value={filters.category} 
                                    onChange={handleFilterChange}
                                    style={{ width: "100%", padding: "8px" }}
                                >
                                    <option value="">All Categories</option>
                                    <option value="Villa">Villa</option>
                                    <option value="House">House</option>
                                    <option value="Apartment">Apartment</option>
                                </select>
                            </div>
                        </section>

                        <br />
                        <hr />
                        <br />

                        <section className="filter-group">
                            <div className="group-header">
                                <h3>Location</h3>
                            </div>
                            <div className="filter-options">
                                <select 
                                    name="location" 
                                    value={filters.location} 
                                    onChange={handleFilterChange}
                                    style={{ width: "100%", padding: "8px" }}
                                >
                                    <option value="">All Locations</option>
                                    <option value="Jakarta">Jakarta</option>
                                    <option value="Bandung">Bandung</option>
                                    <option value="Bali">Bali</option>
                                    <option value="Medan">Medan</option>
                                    <option value="Surabaya">Surabaya</option>
                                </select>
                            </div>
                        </section>

                        <br />
                        <hr />
                        <br />

                        <section className="filter-group">
                            <div className="group-header">
                                <h3>Price Range</h3>
                            </div>
                            <div className="price-inputs">
                                <input 
                                    type="number" 
                                    placeholder="Min Price" 
                                    name="minPrice"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                    style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                                />
                                <input 
                                    type="number" 
                                    placeholder="Max Price" 
                                    name="maxPrice"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                    style={{ width: "100%", padding: "8px" }}
                                />
                            </div>
                        </section>
                    </div>

                    <div className="properties-grid">
                        {filteredProperties.length === 0 ? (
                            <p>No properties found matching your filters.</p>
                        ) : (
                            filteredProperties.map(property => (
                                <div key={property.id} className="property-card-item">
                                    <div className="property-image">
                                        <img src={property.image || "https://via.placeholder.com/300"} alt={property.title} />
                                    </div>
                                    <div className="property-info">
                                        <h3>{property.title}</h3>
                                        <p className="location">{property.location}</p>
                                        <p className="category">{property.category}</p>
                                        <div className="property-features">
                                            <span>{property.bedrooms} Beds</span>
                                            <span>{property.bathrooms} Baths</span>
                                            <span>{property.area} m²</span>
                                        </div>
                                        <div className="property-footer">
                                            <p className="price">${property.price?.toLocaleString()}</p>
                                            <div className="rating">⭐ {property.rating || "N/A"}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <End />
        </div>
    );
}

export default ListingsWithFirebase;
