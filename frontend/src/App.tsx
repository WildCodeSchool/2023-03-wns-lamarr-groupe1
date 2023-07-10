import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, SignUpPage, PricingPage } from "./pages/ExportPages";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/subscribe" element={<PricingPage />} />
    </Routes>
  );
};

export default App;
