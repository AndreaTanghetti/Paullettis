import React, { useState } from 'react';
import "./NavBar.css";
import CartWidget from '../CartWidget/CartWidget';
import imgLogo from '../../../public/img/logo.png';
import { Link, NavLink } from "react-router-dom";
import Login from "../Login/Login";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <Link to={'/'} className='logo'>
        <img src={imgLogo} alt="Logo Clementina" />
      </Link>
      <Login />

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
            <NavLink className="link" >Productos</NavLink>
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
        </ul>
        <CartWidget />
      </nav>
    </header>
  );
};

export default NavBar;
