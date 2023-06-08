import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, SignIn, PricingPage } from "./pages/ExportPages";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/subscribe" element={<PricingPage />} />
    </Routes>
  );
};

export default App;
