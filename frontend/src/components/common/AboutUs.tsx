import React from "react";
import OurProject from "../../assets/img/our_project.png";
import OurTeam from "../../assets/img/our_team.png";
const AboutUs = () => {
  return (
    <div className="container-about-us">
      <h4 className="title">About us</h4>
      <div className="container-description">
        <h6>Our Project</h6>

        <div className="content-img-text content-1">
          <div className="img">
            <img src={OurProject} alt="" />
          </div>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui a
            iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non
            ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            a iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non ipsam
          </p>
        </div>
      </div>
      <div className="container-description">
        <h6>Our Project</h6>
        <div className="content-img-text content-2">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui a
            iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non
            ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            a iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non ipsam
          </p>
          <div className="img">
            <img src={OurTeam} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
