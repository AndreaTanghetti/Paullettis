import { CarritoContext } from "../../context/CarritoContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"
import "./Cart.css"

const Cart = () => {
    const { carrito, eliminarCarrito, totalPrecio, cantTotal } = useContext(CarritoContext);
    if (cantTotal == 0) {
        return (
            <div className="carritoVacio">
                <h2 className="carritoH2">AÚN NO TENÉS PRODUCTOS EN TU CARRITO DE COMPRAS</h2>
                <p className="pCartVacio">Cuando elijas tus productos te mostraremos el resumen de tu compra.</p>
                <Link to="/productos" className="link0">Ver Productos</Link>
            </div>
        )
    }
    return (
        <div >
            {
                carrito.map(producto => <CartItem key={producto.item.id} {...producto} />)}
            <div className="divCierreCarrito">
                <p>Productos Agregados: {cantTotal}</p>
                <p>Total a Pagar: ${totalPrecio}</p>
                <button className="btnVaciar" onClick={() => eliminarCarrito()}> Vaciar Carrito</button>
                <Link to="/checkout" className="link2">Finalizar Compra</Link>
                <Link to="/productos" className="link1">Seguir Comprando</Link>

            </div>

        </div>
    )

}

export default Cart