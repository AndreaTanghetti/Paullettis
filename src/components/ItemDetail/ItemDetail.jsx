import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../../context/CarritoContext'



const ItemDetail = ({ nombre, img, precio, stock, id, descripcion, }) => {

  const [agregarCant, setAgregarCant] = useState(0)

  const { agregarProd } = useContext(CarritoContext)

  const handlerCant = (cantidad) => {
    setAgregarCant(cantidad)

    const item = { id, nombre, precio, img }
    agregarProd(item, cantidad)
  }



  return (
    <div className='contDetail'>
      <img src={img} alt={nombre} className='imgProdDetail' />
      <div className='info'>
        <h3 className='nombDetail'>{nombre}</h3>
        <p className='stock'>Stock: {stock}</p>

        {stock > 0 ?
          <>
            <p className='descripcion'>{descripcion}</p>
            <strong className='precioDetail'>${precio}</strong>
          </>
          : (
            <p className='descripcion'> {descripcion = "No hay stock disponible"}</p>
          )}

        {agregarCant === 0 && (
          <>
            {stock > 0 ? (
              <ItemCount className='contadorItem'
                inicial={1}
                stock={stock}
                nombre={nombre}
                funcionAgregar={handlerCant}
              />
            ) : (
              <Link to="/productos">Ver otros productos</Link>
            )}
          </>
        )}
        {agregarCant > 0 && (
          <>
            <Link className='linkItem1' to="/productos">Seguir comprando</Link>
            <Link className='linkItem2' to="/cart">Terminar compra</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default ItemDetail

