import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AddProduct from './pages/Add_Product';
import ProductUpload from './pages/productupload';
import Login from './pages/login';
import Register from './pages/register';
import { useAuth } from './firebase';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/home'));
const Listings = lazy(() => import('./pages/listings'));
const DetailProperties = lazy(() => import('./pages/detail-properties'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const Blog = lazy(() => import('./pages/blog'));
const Articles = lazy(() => import('./pages/articles'));
const Detail = lazy(() => import('./pages/detail'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <p>Loading...</p>
  </div>
);

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <LoadingFallback />;
  }

  if (!user || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/company" element={<DetailProperties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/add-product" element={<AdminRoute><AddProduct /></AdminRoute>} />
          <Route path="/productupload" element={<AdminRoute><ProductUpload /></AdminRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
