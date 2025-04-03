import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userType = storedUser?.userType;

  if (userType === "employer") {
    return (
      children,
      alert("hello employer!")
    ) // Render the protected page
  } else {
    return <Navigate to="/" replace />; // Redirect unauthorized users
  }
};

export default ProtectedRoute;
