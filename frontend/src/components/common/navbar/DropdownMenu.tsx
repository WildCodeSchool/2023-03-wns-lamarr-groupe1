import React, { useState } from "react";
import "styles/components/navbarDropdown.scss";
import { Link } from "react-router-dom";
import img from "assets/img/mainLogo.svg";


const NavbarDropdown = () => {


  return (
		<>
			<div className="dropdown-main">
				<ul>
					<li>
						<a href="/profile">Mon profile</a>
					</li>
					<li>
						<a href="/file">Mes fichers</a>
					</li>
					<li>
						<a href="/search-files">Tous les fichiers</a>
					</li>
				</ul>
			</div>
			
		</>
	);
};

export default NavbarDropdown;