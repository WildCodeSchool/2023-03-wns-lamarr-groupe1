import React from "react";
import Layout from "../components/common/layouts/Layout";
import HomePage from "../components/common/HomePage";
import AboutUs from "../components/common/AboutUs";
import "../styles/AboutUs.scss";
import "../styles/components/Pricing.scss";
import Pricing from "../components/common/Pricing";

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
