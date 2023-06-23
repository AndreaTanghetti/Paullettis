import { useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import tachito from "../../../public/img/icono-tacho.png"
import "./CartItem.css"

const CartItem = ({ item, cantidad }) => {
  const { restarProd, sumarProd, eliminar } = useContext(CarritoContext)
  return (
    <div className="contProdCarrito">
      <div className="descripProd">

        <img className='imgProdCarrito' src={item.img} alt={item.nombre} />

        <div className="divInfo">
          <h3>{item.nombre}</h3>
          <p >Precio unitario <strong className="precio">${item.precio}</strong></p>
          <div className="contador">
            <button className="restar" onClick={() => restarProd(item, 1)}>-</button>
            <strong className="numero"> {cantidad}</strong>
            <button className="sumar" onClick={() => sumarProd(item, 1)}>+</button>
          </div>

        </div>

        <button className="botonTachito" onClick={() => eliminar(item.id)}>
          <img className="iconoCompra" src={tachito} alt="icono tachito" />
        </button>
      </div>

    </div>
  )
}

export default CartItem
