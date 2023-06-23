import { Link } from "react-router-dom"
import { useState } from "react"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import withReactContent from 'sweetalert2-react-content'
import "./Login.css"


const LoginCrear = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [correo, setCorreo] = useState("")
  const [tel, setTel] = useState("")
  const [nomUser, setNomUser] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [confContrasena, setConfContrasena] = useState("")

  const limpiarForm = () => {
    setNombre("")
    setApellido("")
    setCorreo("")
    setTel("")
    setNomUser("")
    setContrasena("")
    setConfContrasena("")
  }

  const cuentaCreada = {
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: tel,
    user: nomUser,
    contrasena: contrasena
  }

  const sesionOk = {
    user: nomUser,
    contrasena: contrasena
  }

  const enviarForm = async () => {

    const cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    cuentas.push(cuentaCreada);
    localStorage.setItem("cuentas", JSON.stringify(cuentas));

    const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva")) || [];
    sesionActiva.push(sesionOk)
    localStorage.setItem("sesionActiva", JSON.stringify(sesionActiva))

    await new Promise((resolve) => setTimeout(resolve, 0))
    MySwal.fire({
      title: "Cuenta creada!",
      confirmButtonColor: "#ee82ee",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
    limpiarForm();
  }

  const handleCuenta = (e) => {
    e.preventDefault()

    if (!nombre || !apellido || !correo || !tel || !nomUser || !contrasena || !confContrasena) {

      MySwal.fire({
        title: "¡UPS!",
        text: "Verifique que todos los campos esten completos",
        confirmButtonColor: "#ee82ee",

      })
    } else if (confContrasena !== contrasena) {
      MySwal.fire({
        title: "¡UPS!",
        text: "Las contraseñas no coinciden",
        confirmButtonColor: "#ee82ee",

      })
    } else {
      enviarForm()
    }
  }
  return (
    <div className="formularioLogin">
      <form onSubmit={handleCuenta}>
        <label htmlFor="">Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label htmlFor="">Apellido</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />

        <label htmlFor="">Correo Electronico</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />

        <label htmlFor="">Telefono</label>
        <input type="Tel" value={tel} onChange={(e) => setTel(e.target.value)} />

        <label htmlFor="">Nombre de Usuario</label>
        <input type="text" value={nomUser} onChange={(e) => setNomUser(e.target.value)} />

        <label htmlFor="">Contraseña</label>
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

        <label htmlFor="">Repetir Contraseña</label>
        <input type="password" value={confContrasena} onChange={(e) => setConfContrasena(e.target.value)} />

        <button className="btnLogin">CREAR CUENTA</button>
        <p className="pLogin">¿Ya tenes una cuenta? <Link className="linkLogin" to={"/iniciarsesion"}> Iniciar sesion</Link></p>
      </form>
    </div>
  )
}

export default LoginCrear