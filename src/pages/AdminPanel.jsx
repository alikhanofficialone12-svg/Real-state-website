import React, { useState, useEffect } from "react";
import { propertyService } from "../services/propertyService";
import { articleService } from "../services/articleService";
import { uploadPropertyImage, uploadArticleImage } from "../firebase/db";
import "./AdminPanel.css";

function AdminPanel() {
    const [activeTab, setActiveTab] = useState("properties");
    const [properties, setProperties] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [propertyForm, setPropertyForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        category: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        image: null,
        rating: "",
        features: []
    });

    const [articleForm, setArticleForm] = useState({
        title: "",
        content: "",
        author: "",
        category: "",
        image: null
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "properties") {
                const data = await propertyService.fetchProperties();
                setProperties(data);
            } else {
                const data = await articleService.fetchArticles(100);
                setArticles(data);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            alert("Error loading data");
        } finally {
            setLoading(false);
        }
    };

    // Property handlers
    const handlePropertyInputChange = (e) => {
        const { name, value } = e.target;
        setPropertyForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePropertyFileChange = (e) => {
        setPropertyForm(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handlePropertySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = propertyForm.image;

            // Upload image if new one provided
            if (propertyForm.image && typeof propertyForm.image === "object") {
                const uploadResult = await uploadPropertyImage(propertyForm.image, editingId || "temp");
                if (uploadResult.success) {
                    imageUrl = uploadResult.url;
                }
            }

            const data = {
                title: propertyForm.title,
                description: propertyForm.description,
                price: parseInt(propertyForm.price),
                location: propertyForm.location,
                category: propertyForm.category,
                bedrooms: parseInt(propertyForm.bedrooms),
                bathrooms: parseInt(propertyForm.bathrooms),
                area: parseInt(propertyForm.area),
                image: imageUrl,
                rating: parseFloat(propertyForm.rating),
                features: propertyForm.features
            };

            if (editingId) {
                await propertyService.updatePropertyData(editingId, data);
                alert("Property updated successfully");
            } else {
                await propertyService.createProperty(data);
                alert("Property created successfully");
            }

            resetPropertyForm();
            setShowForm(false);
            fetchData();
        } catch (err) {
            console.error("Error saving property:", err);
            alert("Error saving property");
        } finally {
            setLoading(false);
        }
    };

    const handlePropertyEdit = (property) => {
        setPropertyForm({
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            category: property.category,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            area: property.area,
            image: property.image,
            rating: property.rating,
            features: property.features || []
        });
        setEditingId(property.id);
        setShowForm(true);
    };

    const handlePropertyDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            setLoading(true);
            try {
                await propertyService.deletePropertyData(id);
                alert("Property deleted successfully");
                fetchData();
            } catch (err) {
                console.error("Error deleting property:", err);
                alert("Error deleting property");
            } finally {
                setLoading(false);
            }
        }
    };

    const resetPropertyForm = () => {
        setPropertyForm({
            title: "",
            description: "",
            price: "",
            location: "",
            category: "",
            bedrooms: "",
            bathrooms: "",
            area: "",
            image: null,
            rating: "",
            features: []
        });
        setEditingId(null);
    };

    // Article handlers (similar structure)
    const handleArticleInputChange = (e) => {
        const { name, value } = e.target;
        setArticleForm(prev => ({ ...prev, [name]: value }));
    };

    const handleArticleFileChange = (e) => {
        setArticleForm(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleArticleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = articleForm.image;

            if (articleForm.image && typeof articleForm.image === "object") {
                const uploadResult = await uploadArticleImage(articleForm.image, editingId || "temp");
                if (uploadResult.success) {
                    imageUrl = uploadResult.url;
                }
            }

            const data = {
                title: articleForm.title,
                content: articleForm.content,
                author: articleForm.author,
                category: articleForm.category,
                image: imageUrl
            };

            if (editingId) {
                await articleService.updateArticleData(editingId, data);
                alert("Article updated successfully");
            } else {
                await articleService.createArticle(data);
                alert("Article created successfully");
            }

            resetArticleForm();
            setShowForm(false);
            fetchData();
        } catch (err) {
            console.error("Error saving article:", err);
            alert("Error saving article");
        } finally {
            setLoading(false);
        }
    };

    const handleArticleEdit = (article) => {
        setArticleForm({
            title: article.title,
            content: article.content,
            author: article.author,
            category: article.category,
            image: article.image
        });
        setEditingId(article.id);
        setShowForm(true);
    };

    const handleArticleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            setLoading(true);
            try {
                await articleService.deleteArticleData(id);
                alert("Article deleted successfully");
                fetchData();
            } catch (err) {
                console.error("Error deleting article:", err);
                alert("Error deleting article");
            } finally {
                setLoading(false);
            }
        }
    };

    const resetArticleForm = () => {
        setArticleForm({
            title: "",
            content: "",
            author: "",
            category: "",
            image: null
        });
        setEditingId(null);
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <button 
                    className="btn-add-new"
                    onClick={() => {
                        setShowForm(!showForm);
                        if (!showForm) {
                            if (activeTab === "properties") resetPropertyForm();
                            else resetArticleForm();
                        }
                    }}
                >
                    {showForm ? "Cancel" : "+ Add New"}
                </button>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab ${activeTab === "properties" ? "active" : ""}`}
                    onClick={() => { setActiveTab("properties"); setShowForm(false); }}
                >
                    Properties
                </button>
                <button 
                    className={`tab ${activeTab === "articles" ? "active" : ""}`}
                    onClick={() => { setActiveTab("articles"); setShowForm(false); }}
                >
                    Articles
                </button>
            </div>

            {showForm && (
                <div className="admin-form">
                    {activeTab === "properties" ? (
                        <form onSubmit={handlePropertySubmit}>
                            <h2>{editingId ? "Edit Property" : "Add New Property"}</h2>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title" 
                                value={propertyForm.title}
                                onChange={handlePropertyInputChange}
                                required 
                            />
                            <textarea 
                                name="description" 
                                placeholder="Description" 
                                value={propertyForm.description}
                                onChange={handlePropertyInputChange}
                                required 
                            ></textarea>
                            <input 
                                type="number" 
                                name="price" 
                                placeholder="Price" 
                                value={propertyForm.price}
                                onChange={handlePropertyInputChange}
                                required 
                            />
                            <input 
                                type="text" 
                                name="location" 
                                placeholder="Location" 
                                value={propertyForm.location}
                                onChange={handlePropertyInputChange}
                                required 
                            />
                            <select 
                                name="category" 
                                value={propertyForm.category}
                                onChange={handlePropertyInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Villa">Villa</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                            </select>
                            <input 
                                type="number" 
                                name="bedrooms" 
                                placeholder="Bedrooms" 
                                value={propertyForm.bedrooms}
                                onChange={handlePropertyInputChange}
                                required 
                            />
                            <input 
                                type="number" 
                                name="bathrooms" 
                                placeholder="Bathrooms" 
                                value={propertyForm.bathrooms}
                                onChange={handlePropertyInputChange}
                                required 
                            />
                            <input 
                                type="number" 
                                name="area" 
                                placeholder="Area (m²)" 
                                value={propertyForm.area}
                                onChange={handlePropertyInputChange}
                                required 
                            />
                            <input 
                                type="number" 
                                name="rating" 
                                placeholder="Rating (0-5)" 
                                step="0.1"
                                value={propertyForm.rating}
                                onChange={handlePropertyInputChange}
                            />
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handlePropertyFileChange}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? "Saving..." : editingId ? "Update" : "Create"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleArticleSubmit}>
                            <h2>{editingId ? "Edit Article" : "Add New Article"}</h2>
                            <input 
                                type="text" 
                                name="title" 
                                placeholder="Title" 
                                value={articleForm.title}
                                onChange={handleArticleInputChange}
                                required 
                            />
                            <textarea 
                                name="content" 
                                placeholder="Content" 
                                value={articleForm.content}
                                onChange={handleArticleInputChange}
                                required 
                            ></textarea>
                            <input 
                                type="text" 
                                name="author" 
                                placeholder="Author" 
                                value={articleForm.author}
                                onChange={handleArticleInputChange}
                            />
                            <input 
                                type="text" 
                                name="category" 
                                placeholder="Category" 
                                value={articleForm.category}
                                onChange={handleArticleInputChange}
                            />
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleArticleFileChange}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? "Saving..." : editingId ? "Update" : "Create"}
                            </button>
                        </form>
                    )}
                </div>
            )}

            <div className="admin-list">
                {loading && <p>Loading...</p>}
                {activeTab === "properties" && (
                    <div className="properties-list">
                        {properties.map(property => (
                            <div key={property.id} className="list-item">
                                <div className="item-info">
                                    <h3>{property.title}</h3>
                                    <p>${property.price} - {property.location}</p>
                                </div>
                                <div className="item-actions">
                                    <button className="btn-edit" onClick={() => handlePropertyEdit(property)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handlePropertyDelete(property.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "articles" && (
                    <div className="articles-list">
                        {articles.map(article => (
                            <div key={article.id} className="list-item">
                                <div className="item-info">
                                    <h3>{article.title}</h3>
                                    <p>{article.category} - By {article.author}</p>
                                </div>
                                <div className="item-actions">
                                    <button className="btn-edit" onClick={() => handleArticleEdit(article)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleArticleDelete(article.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminPanel;
