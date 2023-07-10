import React from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/common/layouts/Layout"
import img from "../../src/assets/img/illustration-home.png"

const Home = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div>
        <div>
          <img src={img} alt="Illustration page d'accueil"/>
        </div>
        <div></div>
      </div>
    </Layout>
  )
}

export default Home
