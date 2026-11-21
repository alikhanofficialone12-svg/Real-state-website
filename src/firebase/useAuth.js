import { useState, useEffect } from "react";
import { auth } from "./db";
import { onAuthStateChanged } from "firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          setRole(
            currentUser.email?.toLowerCase() === "admin@estate.com" ||
            currentUser.email?.toLowerCase() === "abbas@estate.com"
              ? "admin"
              : "user"
          );
        } else {
          setUser(null);
          setRole("user");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return { user, role, loading, error };
};
