// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, limit, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZFqOvt-DMqh8Nc0T9XgJYaMPNhrDY2ng",
  authDomain: "real-estate-77f39.firebaseapp.com",
  projectId: "real-estate-77f39",
  storageBucket: "real-estate-77f39.firebasestorage.app",
  messagingSenderId: "1051168012708",
  appId: "1:1051168012708:web:2dc074bfc081e17dd1a931",
  measurementId: "G-3GZQXEY9YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ===== AUTHENTICATION FUNCTIONS =====
const ADMIN_EMAILS = ["admin@estate.com", "abbas@estate.com"];
const ADMIN_PASSWORD = "Admin@123";
const AUTH_SESSION_KEY = "estate_auth_session";

const getRoleFromEmail = (email) => {
  if (!email) return "user";
  return ADMIN_EMAILS.includes(email.toLowerCase()) ? "admin" : "user";
};

export const persistAuthSession = (user, role) => {
  if (typeof window === "undefined" || !user) return;

  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ user, role }));
  } catch (error) {
    console.warn("Unable to persist auth session:", error);
  }
};

export const getStoredAuthSession = () => {
  if (typeof window === "undefined") return null;

  try {
    const storedValue = localStorage.getItem(AUTH_SESSION_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.warn("Unable to read auth session:", error);
    return null;
  }
};

export const clearStoredAuthSession = () => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
  } catch (error) {
    console.warn("Unable to clear auth session:", error);
  }
};

const ensureUserProfile = async (user) => {
  if (!user) return "user";

  const role = getRoleFromEmail(user.email);
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      role,
      updatedAt: new Date()
    }, { merge: true });
  } catch (error) {
    console.warn("Unable to store user role:", error);
  }

  return role;
};



export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const role = await ensureUserProfile(userCredential.user);
    persistAuthSession(userCredential.user, role);
    return { success: true, user: userCredential.user, role };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  const normalizedEmail = email?.trim().toLowerCase();
  const trimmedPassword = password?.trim();

  if (!normalizedEmail || !trimmedPassword) {
    return { success: false, error: "Email and password are required.", code: "auth/invalid-input" };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, trimmedPassword);
    const role = await ensureUserProfile(userCredential.user);
    persistAuthSession(userCredential.user, role);
    return { success: true, user: userCredential.user, role };
  } catch (error) {
    console.error("Firebase login error:", error);
    if ((error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") && ADMIN_EMAILS.includes(normalizedEmail)) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, trimmedPassword);
        const role = await ensureUserProfile(userCredential.user);
        persistAuthSession(userCredential.user, role);
        return { success: true, user: userCredential.user, role };
      } catch (createError) {
        console.error("Firebase create-user fallback error:", createError);
        return { success: false, error: createError.message, code: createError.code };
      }
    }

    let message = error.message;

    if (error.code === "auth/invalid-credential") {
      message = "Invalid Firebase credential. Check that Email/Password sign-in is enabled in the Firebase console and that the credentials are correct.";
    } else if (error.code === "auth/operation-not-allowed") {
      message = "Email/Password sign-in is disabled in Firebase. Enable it in the Firebase console under Authentication -> Sign-in method.";
    }

    return { success: false, error: message, code: error.code };
  }
};

export const logoutUser = async () => {
  try {
    clearStoredAuthSession();
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ===== PROPERTY FUNCTIONS =====
export const addProperty = async (propertyData) => {
  try {
    const docRef = await addDoc(collection(db, "properties"), {
      ...propertyData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProperties = async (filters = {}) => {
  try {
    let q = collection(db, "properties");
    const querySnapshot = await getDocs(q);
    let properties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Apply filters
    if (filters.category) {
      properties = properties.filter(p => p.category === filters.category);
    }
    if (filters.location) {
      properties = properties.filter(p => p.location === filters.location);
    }
    if (filters.minPrice) {
      properties = properties.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      properties = properties.filter(p => p.price <= filters.maxPrice);
    }

    return { success: true, data: properties };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPropertyById = async (propertyId) => {
  try {
    const docRef = doc(db, "properties", propertyId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Property not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProperty = async (propertyId, propertyData) => {
  try {
    const docRef = doc(db, "properties", propertyId);
    await updateDoc(docRef, {
      ...propertyData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const docRef = doc(db, "properties", propertyId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ===== ARTICLE/BLOG FUNCTIONS =====
export const addArticle = async (articleData) => {
  try {
    const docRef = await addDoc(collection(db, "articles"), {
      ...articleData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getArticles = async (limitResults = 10) => {
  try {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"), limit(limitResults));
    const querySnapshot = await getDocs(q);
    const articles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: articles };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getArticleById = async (articleId) => {
  try {
    const docRef = doc(db, "articles", articleId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Article not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    const docRef = doc(db, "articles", articleId);
    await updateDoc(docRef, {
      ...articleData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const docRef = doc(db, "articles", articleId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ===== CONTACT FORM FUNCTIONS =====
export const submitContactForm = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      ...contactData,
      createdAt: new Date(),
      status: "new"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getContactForms = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: contacts };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateContactStatus = async (contactId, status) => {
  try {
    const docRef = doc(db, "contacts", contactId);
    await updateDoc(docRef, { status });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ===== IMAGE UPLOAD FUNCTIONS =====
export const uploadPropertyImage = async (file, propertyId) => {
  try {
    const fileName = `properties/${propertyId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const uploadArticleImage = async (file, articleId) => {
  try {
    const fileName = `articles/${articleId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ===== PRODUCT FUNCTIONS (Alias for Property) =====
export const addProduct = async (productData) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return { success: false, error: "User must be logged in to upload products." };
    }

    const docRef = await addDoc(collection(db, "products"), {
      uid: currentUser.uid,
      title: productData.name,
      description: productData.description || "",
      price: productData.price,
      category: productData.category || "Product",
      image: productData.image,
      Date: productData.date ? new Date(productData.date) : new Date(),
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      rating: 0,
      features: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProducts = async (filters = {}) => {
  try {
    let q = collection(db, "products");
    const querySnapshot = await getDocs(q);
    let products = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      name: doc.data().title,
      ...doc.data() 
    }));

    // Apply filters
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }
    if (filters.minPrice) {
      products = products.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
      products = products.filter(p => p.price <= filters.maxPrice);
    }

    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { 
        success: true, 
        data: { 
          id: docSnap.id, 
          name: docSnap.data().title,
          ...docSnap.data() 
        } 
      };
    } else {
      return { success: false, error: "Product not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const docRef = doc(db, "products", productId);
    await updateDoc(docRef, {
      title: productData.name || productData.title,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      image: productData.image,
      Date: productData.date ? new Date(productData.date) : new Date(),
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};