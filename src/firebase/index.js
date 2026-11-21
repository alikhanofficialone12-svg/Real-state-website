// Export all Firebase functions and utilities
export {
  auth,
  db,
  storage,
  // Auth Functions
  registerUser,
  loginUser,
  logoutUser,
  onAuthChange,
  // Property Functions
  addProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  // Article Functions
  addArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  // Contact Functions
  submitContactForm,
  getContactForms,
  updateContactStatus,
  // Image Upload Functions
  uploadPropertyImage,
  uploadArticleImage,
  deleteImage,
  // Product Functions (aliases for properties)
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "./db";

export { useAuth } from "./useAuth";
