import React, { useState, useEffect } from "react";
import './Navbar.css'

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                src="/Netflix_Logo_RGB.png"
                alt="Netflix_Logo"
                className="nav__logo"
            />

            <img
                src="/Avatar.jpg"
                alt="Aavtar_Logo"
                className="nav__avatar"
            />

        </div>
    );
}

export default Navbar;