import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
}

function Root() {
  const [user, setUser] = useState(getSavedUser);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <App
      user={user}
      setUser={setUser}
      onLogout={handleLogout}
    />
  );
}

createRoot(document.getElementById("root")).render(<Root />);
