import React from "react";
import Header from "../components/header";
import End from "../components/end";
import Image13 from "../assets/image copy 13.png";
import { LuDot } from "react-icons/lu";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase/db";
import { collection, getDocs } from "firebase/firestore";
import Card3 from "../components/card3";


const Articles = () => {

    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate("/detail");
    }

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {
            try {

                // Get ALL products from firestore
                const querySnapshot = await getDocs(
                    collection(db, "products")
                );

                const productsArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setProducts(productsArray);

            } catch (error) {

                console.log("Error fetching products:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchProducts();

    }, []);

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
                        {products.map((product) => (
                            <Card3
                                key={product.id}
                                name={product.title}
                                type={product.category}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                date={product.Date}
                            />
                        ))}
                    </div>
                </div>
                <div className="pagination">
                    <button className="prev-btn"><MdKeyboardArrowLeft /></button>
                    <button className="page-btn">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="ellipsis-btn">...</button>
                    <button className="next-btn"><MdKeyboardArrowRight /></button>
                </div>
            </div>
            <End />
        </div>
    )
};

export default Articles;