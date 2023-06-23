import Carrousel from "../Carrousel/Carrousel"
import { Link } from "react-router-dom"
import imgBuzo from "../../../public/img/buzoHome.jpeg"
import imgRemera from "../../../public/img/remerasHome.jpeg"
import imgPantalon from "../../../public/img/pantalonHome.jpeg"
import "./Home.css"
const Home = () => {
  return (
    <div>
      <h1>HOLA! QUE BUENO QUE ESTÉS ACÁ!</h1>
      <Carrousel />

      <h2 className="h2Cat">NUESTROS PRODUCTOS</h2>
      <div className="divCategorias">
        <Link to={`/categoria/2`} className="linkHome">
          <img className="imgHome" src={imgBuzo} alt="Foto de buzo" />
          <p className="pCat" >Buzos</p>
        </Link>

        <Link to={`/categoria/1`} className="linkHome">
          <img className="imgHome" src={imgRemera} alt="Foto de buzo" />
          <p className="pCat">Remeras</p>
        </Link>

        <Link to={`/categoria/3`} className="linkHome">
          <img className="imgHome" src={imgPantalon} alt="Foto de buzo" />
          <p className="pCat">Pantalones</p>
        </Link>
      </div>

    </div>
  )
}

export default Home