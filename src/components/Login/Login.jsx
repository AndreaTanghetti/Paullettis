import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

const Login = () => {
    const navigate = useNavigate();

    const cerrarSesion = () =>{
        Swal.fire({
            title: "Cerrar Sesion",
            text: "¿Estas seguro?",
            confirmButtonText: "Cerrar sesion",
            showCancelButton: true,
            cancelButtonText: "No",
            confirmButtonColor: "#ee82ee"
        }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("sesionActiva");
              navigate("/");

            }
          });
    }
    if(localStorage.getItem("sesionActiva") !== null ){
        return(
            <div className="login">
                <button onClick={cerrarSesion} className="btnCerrar">Cerrar Sesion</button>
            </div>
        )
    }
  return (
    <div className="login">
<Link to={'/crearcuenta'} className="linkCrear">Crear Cuenta</Link>
<span className="span">|</span>
<Link to={'/iniciarsesion'} className="linkIniciar">Iniciar Sesion</Link>
    </div>
  )
}

export default Login