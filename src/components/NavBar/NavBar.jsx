import "./NavBar.css"
import CartWidget from '../CartWidget/CartWidget'
import imgLogo from '../../../public/img/logo.png'
import { Link, NavLink } from "react-router-dom"
import Login from "../Login/Login"
const NavBar = () => {
  return (
    <header>
      <Link to={'/'} className='logo'>
        <img src={imgLogo} alt="Logo Clementina" />
      </Link>
        <Login className="botones"/>
      <nav className='menu'>
        <ul>
          <li>
            <NavLink to={`/productos`} className="link">Ver Todo</NavLink>
          </li>
          <li>
            <NavLink to={`/categoria/1`} className="link">Remeras</NavLink>
          </li>
          <li>
            <NavLink to={`/categoria/3`} className="link">Pantalones</NavLink>
          </li>
          <li>
            <NavLink to={`/categoria/2`} className="link">Buzos</NavLink>
          </li>
        </ul>
        <CartWidget />
      </nav>
    </header>

  )
}

export default NavBar

