import React from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
<<<<<<< Updated upstream
import { Home, SignIn, SignUpPage, PricingPage } from "./pages/ExportPages";
=======
import SignIn from "./pages/SignIn";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
>>>>>>> Stashed changes

const App = () => {
  return (
    <Routes>
<<<<<<< Updated upstream
      <Route path="/*" element={<Home />} />
=======
      <Route path="/main" element={<LandingPage />} />
>>>>>>> Stashed changes
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/subscribe" element={<PricingPage />} />
    </Routes>
  );
};

export default App;
