import React from "react";
import BasicPriceCard from "../components/common/BasicPriceCard";
import ExpertPriceCard from "../components/common/ExpertPriceCard";
import "../styles/PricingPage.scss";
import Layout from "../components/common/layouts/Layout";

const PricingPage = () => {
  return (
    <>
      <Layout>
        <div className="container-pricing-cards">
          <BasicPriceCard />
          <ExpertPriceCard />
        </div>
      </Layout>
    </>
  );
};

export default PricingPage;
