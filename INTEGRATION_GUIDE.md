# Backend Integration Setup Guide

## Quick Start

This guide shows you how to integrate the Firebase backend into your existing React components.

## Files Created

### Core Firebase Setup
- **`src/firebase/db.js`** - Main Firebase configuration and all database functions
- **`src/firebase/useAuth.js`** - Custom React hook for authentication
- **`src/services/propertyService.js`** - Property data service
- **`src/services/articleService.js`** - Article data service
- **`src/services/contactService.js`** - Contact form service

### Example Components
- **`src/pages/contact-updated.jsx`** - Contact form with Firebase integration
- **`src/pages/listings-with-firebase.jsx`** - Property listings with live data
- **`src/pages/articles-with-firebase.jsx`** - Articles with live data
- **`src/pages/AdminPanel.jsx`** - Admin panel for managing content

### Documentation
- **`FIREBASE_GUIDE.md`** - Complete API documentation

## Integration Steps

### Step 1: Update Your Existing Pages

#### For Listings Page
Replace your current `listings.jsx` with features from `listings-with-firebase.jsx`:

```javascript
import { propertyService } from "../services/propertyService";

// In your component
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchData = async () => {
        const data = await propertyService.fetchProperties();
        setProperties(data);
        setLoading(false);
    };
    fetchData();
}, []);
```

#### For Articles Page
Replace your current `articles.jsx` with features from `articles-with-firebase.jsx`:

```javascript
import { articleService } from "../services/articleService";

useEffect(() => {
    const fetchData = async () => {
        const data = await articleService.fetchArticles(10);
        setArticles(data);
    };
    fetchData();
}, []);
```

#### For Contact Page
Replace your current `contact.jsx` with `contact-updated.jsx` or integrate the form submission:

```javascript
import { contactService } from "../services/contactService";

const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await contactService.submitForm(formData);
    if (result.success) {
        alert("Message sent!");
    }
};
```

### Step 2: Set Up Firestore Collections

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `real-estate-77f39`
3. Go to **Firestore Database**
4. Create collections with these names:
   - `properties`
   - `articles`
   - `contacts`

### Step 3: Add Sample Data (Optional)

Add sample properties to test:

```javascript
// In Firebase Console or use AdminPanel.jsx
{
  title: "Beautiful Villa in Bali",
  description: "Stunning oceanview villa with private pool",
  price: 2500000,
  location: "Bali",
  category: "Villa",
  bedrooms: 3,
  bathrooms: 2,
  area: 250,
  image: "https://...",
  rating: 4.5,
  features: ["Pool", "Garden", "Ocean View"]
}
```

### Step 4: Use Admin Panel

Access the admin panel to manage properties and articles:

```javascript
// Add this route to your App.jsx
import AdminPanel from "./pages/AdminPanel";

// In your router
<Route path="/admin" element={<AdminPanel />} />
```

Access at: `http://localhost:5173/admin`

### Step 5: Configure Home Page

Update your home page to show latest properties and articles:

```javascript
import { propertyService } from "../services/propertyService";
import { articleService } from "../services/articleService";

function Home() {
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [recentArticles, setRecentArticles] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const props = await propertyService.fetchProperties();
            const arts = await articleService.fetchArticles(3);
            
            setFeaturedProperties(props.slice(0, 3));
            setRecentArticles(arts);
        };
        loadData();
    }, []);

    return (
        <div>
            {/* Featured Properties */}
            <section className="featured">
                {featuredProperties.map(prop => (
                    <PropertyCard key={prop.id} property={prop} />
                ))}
            </section>

            {/* Recent Articles */}
            <section className="articles">
                {recentArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </section>
        </div>
    );
}
```

## Important Notes

### Security & Firestore Rules

You MUST set up Firestore Security Rules:

```json
{
  "rules": {
    "properties": {
      ".read": true,
      ".write": "request.auth != null && request.auth.token.isAdmin == true"
    },
    "articles": {
      ".read": true,
      ".write": "request.auth != null && request.auth.token.isAdmin == true"
    },
    "contacts": {
      ".read": "request.auth != null && request.auth.token.isAdmin == true",
      ".write": true
    }
  }
}
```

### Image Upload

Images are stored in Firebase Storage at:
- `properties/{propertyId}/{filename}`
- `articles/{articleId}/{filename}`

Files in `contact-updated.jsx`:

## Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: Make sure all services folder exists:
```bash
mkdir -p src/services
```

### Issue: Firebase config error
**Solution**: Your Firebase config is already set in `src/firebase/db.js`. Make sure it's initialized before using any functions.

### Issue: Images not uploading
**Solution**: Check Storage permissions:
```json
{
  "rules_version": "2",
  "rules": {
    "b/{bucket}/o": {
      ".read": true,
      ".write": "request.auth != null"
    }
  }
}
```

### Issue: No data showing
**Solution**: 
1. Make sure you've added data to Firestore collections
2. Check browser console for errors
3. Verify Firebase project ID matches

## Testing the Integration

### Test 1: Fetch Properties
```javascript
import { propertyService } from "./services/propertyService";

// In browser console
propertyService.fetchProperties().then(data => console.log(data));
```

### Test 2: Submit Contact Form
```javascript
import { contactService } from "./services/contactService";

contactService.submitForm({
    name: "Test User",
    email: "test@example.com",
    message: "Hello"
}).then(result => console.log(result));
```

### Test 3: Add Article
```javascript
import { articleService } from "./services/articleService";

articleService.createArticle({
    title: "Test Article",
    content: "Test content",
    author: "Test Author",
    category: "Test"
}).then(result => console.log(result));
```

## Environment Setup

### Required packages (already in package.json):
- `firebase` (v9+)
- `react` (v18+)
- `react-router-dom` (v6+)

### Install if missing:
```bash
npm install firebase react-router-dom
```

## Next Steps

1. **Deploy Firestore Security Rules**
2. **Connect all pages to backend services**
3. **Set up image optimization for uploads**
4. **Add email notifications for contact forms**
5. **Create user authentication (login/register)**
6. **Build admin dashboard**
7. **Add search/filter functionality**

## Support & Documentation

Refer to:
- `FIREBASE_GUIDE.md` - Complete API reference
- [Firebase Official Docs](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage)

## Summary

You now have:
✅ Complete Firebase backend setup
✅ Firestore database configured
✅ Image storage ready
✅ Contact form integration
✅ Property/Article management
✅ Admin panel
✅ Example components
✅ Service layers for clean code

Start by using the services in your existing components!
