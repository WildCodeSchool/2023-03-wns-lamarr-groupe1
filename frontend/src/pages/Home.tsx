import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";
import Layout from "../components/common/layouts/Layout";
import AboutUs from "../components/common/AboutUs";
import "../styles/AboutUs.scss";
const Home = () => {
  const navigate = useNavigate();

  const handleClickR = () => {
    navigate("/subscribe");
  };
  const handleClickK = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <Layout>
        <div className="container-home">
          <p className="hello">Hello i'm the homepage</p>
          <button onClick={handleClickK}>Khemis</button>
          <button onClick={handleClickR}>Romain</button>
        </div>
      </Layout>
    </>
  );
};

export default Home;
