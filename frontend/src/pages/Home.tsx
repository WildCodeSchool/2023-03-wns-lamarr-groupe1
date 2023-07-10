import React from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <Layout>
        <p>
          Hello i'm the homepage ! I'll make my muscle grow up and i'll be back
          <br></br>
          Click beyond to see what Khemis, Flora & Romain has done
        </p>
        <button onClick={handleClickK}>Khemis</button>
        <button onClick={handleClickR}>Romain</button>
      </Layout>

      <AboutUs />
    </div>
  );
};

export default Home;
