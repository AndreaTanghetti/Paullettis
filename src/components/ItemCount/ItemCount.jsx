import { useState } from "react"
import './ItemCount.css'
const ItemCount = ({ stock, inicial, funcionAgregar }) => {

  const [contador, setContador] = useState(inicial)

  const incrementar = () => {
    if (contador < stock) {
      setContador(contador + 1)
    }
  }

  const decrementar = () => {
    if (contador > inicial) {
      setContador(contador - 1)
    }
  }


  return (
    <div className="contador">
      <button className="restar" onClick={decrementar}>-</button>
      <strong className="numero">{contador}</strong>
      <button className="sumar" onClick={incrementar}>+</button>
      <button className="agregar" onClick={() => funcionAgregar(contador)}> Agregar al carrito </button>
    </div>
  )
}

export default ItemCount