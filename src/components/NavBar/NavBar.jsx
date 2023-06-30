import React, { useState, useEffect } from 'react';
import "./NavBar.css";
import CartWidget from '../CartWidget/CartWidget';
import imgLogo from '../../../public/img/logo.png';
import { Link, NavLink } from "react-router-dom";
import Login from "../Login/Login";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setIsResponsive(true);
      } else {
        setIsResponsive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <header>
      <Link to={'/'} className='logo'>
        <img src={imgLogo} alt="Logo Clementina" />
      </Link>
      {!isResponsive && <Login />}
      <nav className="menu">


        <div className={`icon nav-icon-5 ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`ulNav ${isOpen ? 'open' : ''}`}>
          <li>
            <NavLink to={"/"} className="link">Inicio</NavLink>
          </li>
          <li className="liCategoria">
            <NavLink className="link no-hover" >Productos</NavLink>
            <ul className="ulCategorias" >
              <li>
                <NavLink to={`/categoria/1`} className="linkCategoria">Remeras</NavLink>
              </li>
              <li>
                <NavLink to={`/categoria/3`} className="linkCategoria">Pantalones</NavLink>
              </li>
              <li>
                <NavLink to={`/categoria/2`} className="linkCategoria">Buzos</NavLink>
              </li>
              <li>
                <NavLink to={`/productos`} className="linkCategoria">Ver Todo</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to={"*"} className="link">Info</NavLink>
          </li>
          {isResponsive && <Login />}
        </ul>
        <CartWidget />
      </nav>
    </header>
  );
};

export default NavBar;
