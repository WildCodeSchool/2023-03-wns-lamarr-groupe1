import React from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import "../styles/Home.scss";
=======
import Layout from "../components/common/layouts/Layout";
>>>>>>> 9b4d4ed3164079679d2b09522daf500e8918f0f6

const Home = () => {
  const navigate = useNavigate();

  const handleClickR = () => {
    navigate("/subscribe");
  };
  const handleClickK = () => {
    navigate("/sign-in");
  };

  return (
<<<<<<< HEAD
    <div className="container-home">
      <p className="hello">Hello i'm the homepage</p>
      <button onClick={handleClickK}>Khemis</button>
      <button onClick={handleClickR}>Romain</button>
=======
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
>>>>>>> 9b4d4ed3164079679d2b09522daf500e8918f0f6
    </div>
  );
};

export default Home;
