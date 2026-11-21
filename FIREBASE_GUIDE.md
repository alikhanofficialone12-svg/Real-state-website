# Firebase Backend Integration Guide

## Overview
This Firebase backend provides complete CRUD operations for:
- Properties (Real Estate Listings)
- Articles/Blog Posts
- Contact Form Submissions
- User Authentication
- Image Storage

## Database Collections

### 1. Properties Collection (`properties`)
```javascript
{
  id: "string", // Auto-generated
  title: "string",
  description: "string",
  price: number,
  location: "string", // e.g., "Jakarta", "Bandung", "Bali"
  category: "string", // e.g., "Villa", "House", "Apartment"
  bedrooms: number,
  bathrooms: number,
  area: number, // in m²
  image: "string", // URL from Firebase Storage
  images: ["string"], // Array of image URLs
  rating: number, // 0-5
  reviews: number,
  features: ["string"], // e.g., ["Pool", "Garden", "Garage"]
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 2. Articles Collection (`articles`)
```javascript
{
  id: "string", // Auto-generated
  title: "string",
  content: "string",
  author: "string",
  category: "string", // e.g., "Invest Strategies"
  image: "string", // URL from Firebase Storage
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 3. Contacts Collection (`contacts`)
```javascript
{
  id: "string", // Auto-generated
  name: "string",
  email: "string",
  phone: "string",
  subject: "string",
  message: "string",
  companySize: "string",
  createdAt: timestamp,
  status: "new" | "replied" | "resolved"
}
```

## Available Functions

### Authentication Functions
```javascript
import { registerUser, loginUser, logoutUser, useAuth } from "./firebase/db";

// Register new user
const result = await registerUser(email, password);
if (result.success) {
  console.log("User registered:", result.user);
}

// Login user
const result = await loginUser(email, password);
if (result.success) {
  console.log("User logged in:", result.user);
}

// Logout user
await logoutUser();

// Use auth hook in components
import { useAuth } from "./firebase/useAuth";
const { user, loading, error } = useAuth();
```

### Property Functions
```javascript
import { propertyService } from "./services/propertyService";

// Fetch all properties with filters
const properties = await propertyService.fetchProperties({
  category: "Villa",
  location: "Jakarta",
  minPrice: 1000000,
  maxPrice: 5000000
});

// Fetch single property
const property = await propertyService.fetchPropertyById(propertyId);

// Create new property
const id = await propertyService.createProperty({
  title: "Beautiful Villa in Bali",
  description: "...",
  price: 2000000,
  location: "Bali",
  category: "Villa",
  bedrooms: 3,
  bathrooms: 2,
  area: 250,
  image: "url",
  rating: 4.5,
  features: ["Pool", "Garden"]
});

// Update property
await propertyService.updatePropertyData(propertyId, {
  title: "Updated Title",
  price: 2500000
});

// Delete property
await propertyService.deletePropertyData(propertyId);
```

### Article Functions
```javascript
import { articleService } from "./services/articleService";

// Fetch articles
const articles = await articleService.fetchArticles(10);

// Fetch single article
const article = await articleService.fetchArticleById(articleId);

// Create article
const id = await articleService.createArticle({
  title: "15 Reasons Why Real Estate is the Best Investment",
  content: "...",
  author: "John Doe",
  category: "Invest Strategies",
  image: "url"
});

// Update article
await articleService.updateArticleData(articleId, {
  title: "Updated Title",
  content: "Updated content"
});

// Delete article
await articleService.deleteArticleData(articleId);
```

### Contact Form Functions
```javascript
import { contactService } from "./services/contactService";

// Submit contact form
const result = await contactService.submitForm({
  name: "John Doe",
  email: "john@example.com",
  phone: "123456789",
  message: "I am interested in property ABC",
  companySize: "1-10"
});

// Get all submissions (Admin)
const forms = await contactService.fetchContactForms();

// Update status (Admin)
await contactService.updateStatus(formId, "replied");
```

### Image Upload Functions
```javascript
import { uploadPropertyImage, uploadArticleImage, deleteImage } from "./firebase/db";

// Upload property image
const result = await uploadPropertyImage(file, propertyId);
if (result.success) {
  console.log("Image URL:", result.url);
}

// Upload article image
const result = await uploadArticleImage(file, articleId);

// Delete image
await deleteImage(imageUrl);
```

## Usage Examples

### Example 1: Display Properties with Filters
```javascript
import React, { useState, useEffect } from "react";
import { propertyService } from "../services/propertyService";

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    category: "Villa"
  });

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await propertyService.fetchProperties(filters);
      setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, [filters]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {properties.map(property => (
            <div key={property.id} className="property-card">
              <img src={property.image} alt={property.title} />
              <h3>{property.title}</h3>
              <p>${property.price}</p>
              <p>{property.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyList;
```

### Example 2: Display Recent Articles
```javascript
import React, { useState, useEffect } from "react";
import { articleService } from "../services/articleService";

function RecentArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await articleService.fetchArticles(3);
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="articles-section">
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <img src={article.image} alt={article.title} />
          <h3>{article.title}</h3>
          <p className="date">{new Date(article.createdAt.toDate()).toLocaleDateString()}</p>
          <p className="category">{article.category}</p>
        </div>
      ))}
    </div>
  );
}

export default RecentArticles;
```

### Example 3: Protected Route with Authentication
```javascript
import React from "react";
import { useAuth } from "../firebase/useAuth";

function ProtectedComponent() {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!user) {
    return <div>Please log in to view this content</div>;
  }

  return <div>Welcome, {user.email}!</div>;
}

export default ProtectedComponent;
```

## Firebase Security Rules

Add these rules to Firestore to secure your data:

```json
{
  "rules": {
    "properties": {
      ".read": true,
      ".write": "request.auth != null"
    },
    "articles": {
      ".read": true,
      ".write": "request.auth != null"
    },
    "contacts": {
      ".read": "request.auth != null",
      ".write": true
    }
  }
}
```

## Storage Rules

```json
{
  "rules_version": "2",
  "rules": {
    "b/{bucket}/o": {
      "resource is /b/{bucket}/o/properties/{allPaths=**}": {
        "allow read: if true;
        "allow write: if request.auth != null;
      },
      "resource is /b/{bucket}/o/articles/{allPaths=**}": {
        "allow read: if true;
        "allow write: if request.auth != null;
      }
    }
  }
}
```

## Error Handling

All functions return a result object:
```javascript
{
  success: boolean,
  data: any, // returned on success
  error: string, // returned on error
  id: string // for operations that create documents
}
```

Example error handling:
```javascript
const result = await propertyService.createProperty(data);
if (result.success) {
  console.log("Created property:", result.id);
} else {
  console.error("Error:", result.error);
}
```

## Next Steps

1. Update your component files to use these services
2. Set up Firebase Security Rules in the console
3. Create an admin panel for managing properties and articles
4. Add email notifications for contact form submissions
5. Implement user authentication pages (login/register)
