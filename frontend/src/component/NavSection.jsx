import React, { useState, useEffect } from 'react';
import { IoSunnyOutline, IoHomeOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

function NavSection({ isDarkMode, setIsDarkMode }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleBackground = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                PRODUCT STORE <TiShoppingCart className="logo-img" />
            </div>
            <button className="hamburger" onClick={toggleMenu}>
                <GiHamburgerMenu />
            </button>
            <div className={`nav-buttons ${menuOpen ? "open" : ""}`}>
                <Link to={"/"}>
                    <button><IoHomeOutline className="logo-img" /></button>
                </Link>
                <Link to={"/create"}>
                    <button><CiSquarePlus className="logo-img" /></button>
                </Link>
                <button onClick={toggleBackground}>
                    {isDarkMode ? <IoSunnyOutline className="logo-img" /> : <MdDarkMode className="logo-img" />}
                </button>
            </div>
        </nav>
    );
}

export default NavSection;
