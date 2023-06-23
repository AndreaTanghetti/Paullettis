import { Link } from "react-router-dom"
import './Item.css'
import icono from '../../../public/img/icono-nav.png'
const Item = ({ nombre, img, precio, id }) => {
  return (
    <div className='card' >
      <img src={img} alt={nombre} className='imgProd' />
      <Link to={`/item/${id} `} > <img className="iconoCompra" src={icono} alt="icono bolsa de compras" /></Link>
      <h3 className="nomProd">{nombre}</h3>
      <strong className="precio">${precio}</strong>
    </div>
  )
}

export default Item