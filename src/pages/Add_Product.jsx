import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/db";
import { collection, getDocs } from "firebase/firestore";
import Card2 from "../components/card2";
import Card3 from "../components/card3";
import { deleteProduct } from "../firebase";

const AddProduct = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        try {
            const result = await deleteProduct(productId);
            if (result.success) {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
                alert("Product deleted successfully");
            } else {
                console.error("Delete failed:", result.error);
                alert("Failed to delete product: " + result.error);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product.");
        }
    };

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
        <div>
            <Header />

            <div className="container mt-4">

                {/* Add Product Button */}
                <div
                    className="mb-4"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <button
                        className="btn btn-outline-dark p-2"
                        onClick={() => navigate("/productupload")}
                    >
                        + Add Product
                    </button>
                </div>

                {/* Products */}
                <div
                    className="product"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "50px",
                        marginTop: "50px",
                    }}
                >
                    {loading ? (

                        <div className="text-center w-100">
                            Loading products...
                        </div>

                    ) : products.length > 0 ? (

                        products.map((item) => (
                            <Card3
                                key={item.id}
                                id={item.id}
                                name={item.title}
                                type={item.category}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                date={item.Date}
                                onDelete={() => handleDeleteProduct(item.id)}
                            />
                        ))

                    ) : (

                        <div className="text-center w-100 text-muted">
                            No products found.
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;