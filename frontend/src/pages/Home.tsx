import React from "react";
import "../styles/Home.scss";
import Layout from "../components/common/layouts/Layout";
import AboutUs from "../components/common/AboutUs";
import "../styles/AboutUs.scss";
const Home = () => {
  return (
    <>
      <Layout>
        <div className="container-home">
          <p className="hello">Hello i'm the homepage</p>
        </div>
      </Layout>
    </>
  );
};

export default Home;
