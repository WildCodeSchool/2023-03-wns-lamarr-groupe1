import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleClickR = () => {
    navigate("/subscribe");
  };
  const handleClickK = () => {
    navigate("/sign-in");
  };

  return (
    <div className="container-home">
      <p className="hello">Hello i'm the homepage</p>
      <button onClick={handleClickK}>Khemis</button>
      <button onClick={handleClickR}>Romain</button>
    </div>
  );
};

export default Home;
