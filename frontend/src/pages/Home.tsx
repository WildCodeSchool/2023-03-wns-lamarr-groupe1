import React, { useEffect, useState } from "react";
import Layout from "components/common/layouts/Layout";
import HomePage from "components/common/HomePage";
import AboutUs from "components/common/AboutUs";
import "styles/AboutUs.scss";
import "styles/components/Pricing.scss";
import Pricing from "components/common/Pricing";
import CodingPage from "./Coding";

const Home = () => {
  
  return (
    <Layout>
      <HomePage />
      <Pricing />
      <AboutUs />
    </Layout>
  );
};

export default Home;
