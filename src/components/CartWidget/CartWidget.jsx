import "./CartWidget.css"
import iconoCompra from '../../../public/img/icono-nav.png'
import { useContext } from 'react'
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
const CartWidget = () => {
  const { cantTotal } = useContext(CarritoContext)
  return (
    <div className='contenedor'>
      <Link to="./cart" className="linkNum">
        <img className='iconoCarrito' src={iconoCompra} alt="icono bolsa de compras" />
        {
          cantTotal > 0 ? <strong> {cantTotal}</strong> : <strong>0</strong>
        }
      </Link>
    </div>
  )
}

export default CartWidget