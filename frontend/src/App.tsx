import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  SignIn,
  SignUpPage,
  PricingPage,
  FilePage,
  CodingPage
} from "./pages/ExportPages";
import { FileProvider } from "./utils/context/FileContext";

const App = () => {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  // 1. Hook
  // 2. React Router -> before page load
  // 3. React HOC Higher Order Component

  return (
    <FileProvider>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/subscribe" element={<PricingPage />} />
        <Route path="/coding/:id" element={<CodingPage />} />
        <Route path="/file" element={<FilePage />} />
      </Routes>
    </FileProvider>
  );
};

export default App;
