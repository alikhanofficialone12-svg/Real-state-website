import React, { useState } from "react";
import { addProduct } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";

const ProductUpload = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imgbbKey = "dff12e3f1a432f8f1d020379a857472d";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!name || !price || !image) {
      alert("Please fill all required fields and select an image");
      return;
    }

    console.log("Validation passed, starting upload...");

    try {
      setLoading(true);

      // 1. Upload to ImgBB
      console.log("Uploading image to ImgBB...");
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("ImgBB response:", data);

      if (!data.success) throw new Error("Image Upload Failed");
      const imageUrl = data.data.url;
      console.log("Image uploaded successfully:", imageUrl);

      // 2. Save product in Firebase
      console.log("Saving product to Firebase...");
      const product = {
        name,
        price: parseFloat(price),
        category,
        description,
        date,
        image: imageUrl
      };

      console.log("Product data:", product);

      const result = await addProduct(product);
      console.log("Firebase result:", result);

      if (!result.success) {
        throw new Error(result.error || "Failed to save product");
      }

      alert("Product uploaded successfully!");

      // Reset Form
      setName(""); setPrice(""); setCategory(""); setDescription(""); setDate("");
      setImage(null); setPreview(null);
      navigate("/add-product");

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload Failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="shadow p-4" style={{ maxWidth: "800px", margin: "auto" }}>
          <h3 className="text-center mb-4">Upload Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price *</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Product Image *</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
                required
              />
            </div>
            {preview && (
              <div className="mb-3 text-center">
                <img src={preview} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
              </div>
            )}
            <button className="btn btn-primary w-100" type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;