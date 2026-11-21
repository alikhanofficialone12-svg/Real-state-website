import React, { useState, useEffect } from "react";
import Header from "../components/header";
import End from "../components/end";
import { articleService } from "../services/articleService";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { LuDot } from "react-icons/lu";

function ArticlesWithFirebase() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await articleService.fetchArticles(100); // Fetch more for pagination
            setArticles(data);
        } catch (err) {
            setError("Failed to load articles");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    const formatDate = (firebaseTimestamp) => {
        if (!firebaseTimestamp) return "N/A";
        const date = firebaseTimestamp.toDate ? firebaseTimestamp.toDate() : new Date(firebaseTimestamp);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    if (loading) return <div className="articles-page"><Header /><div>Loading articles...</div><End /></div>;
    if (error) return <div className="articles-page"><Header /><div>{error}</div><End /></div>;

    return (
        <div className="articles-page">
            <Header />
            <div className="articles-content">
                <div className="recent-section">
                    <div className="section-header">
                        <div className="section-text">
                            <div className="section-title">Recent Articles</div>
                            <div className="section-subtitle">
                                Newest update article from AyEstate
                            </div>
                        </div>
                    </div>

                    <div className="recent-list">
                        {currentArticles.length === 0 ? (
                            <p>No articles found.</p>
                        ) : (
                            currentArticles.map(article => (
                                <div key={article.id} className="recent-card">
                                    <div className="recent-image">
                                        <img 
                                            src={article.image || "https://via.placeholder.com/300"} 
                                            alt={article.title} 
                                        />
                                    </div>
                                    <div className="recent-meta">
                                        <div className="recent-date">
                                            {formatDate(article.createdAt)}
                                        </div>
                                        <div className="dot-icon"><LuDot /></div>
                                        <div className="recent-category">
                                            {article.category || "General"}
                                        </div>
                                    </div>
                                    <div className="recent-title">
                                        {article.title}
                                    </div>
                                    <div className="article-excerpt">
                                        {article.content?.substring(0, 150)}...
                                    </div>
                                    <div className="article-author">
                                        By {article.author || "AyEstate"}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="pagination">
                    <button 
                        className="prev-btn"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <MdKeyboardArrowLeft />
                    </button>
                    
                    {[...Array(Math.min(totalPages, 3))].map((_, index) => (
                        <button 
                            key={index + 1}
                            className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    {totalPages > 3 && <button className="ellipsis-btn">...</button>}
                    
                    <button 
                        className="next-btn"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>
            <End />
        </div>
    );
}

export default ArticlesWithFirebase;
