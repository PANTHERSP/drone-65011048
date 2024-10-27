import React, { useState } from "react";
import "./Header.css"
import droneImage from "../assets/5842a770a6515b1e0ad75afe.png"
import { transform } from "framer-motion";
const Header = () => {
    return (
        <div className="header">
            <img style={{ width: "400px", height: "150px", padding: "0px"}} src={droneImage} alt="drone image" />
            <h1 style={{ fontWeight: "400", fontSize: "48px" }}>➢ DRONE CONFIGURATION ✯</h1>
            {/* <img style={{ width: "90px", height: "90px", padding: "50px"}} src="https://assets.goal.com/images/v3/blt4c331b3283695ba6/Man_Utd_Rating.jpg" alt="drone image" /> */}
        </div>
    )
}

export default Header