import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import "./Login.css"

const LoginIniciar = () => {
    const [usuario, setUsuario] = useState("")
    const [contrasenaIniciar, setContrasenaIniciar] = useState("")
    const navigate = useNavigate();
    const [intentosRestantes, setIntentosRestantes] = useState(3)
    const limpiarForm = () => {
        setUsuario("")
        setContrasenaIniciar("")
    }

    const handleIniciar = (e) => {
        e.preventDefault()

        const cuentasJson = localStorage.getItem("cuentas");
        const cuentas = cuentasJson ? JSON.parse(cuentasJson) : [];
        const cuentaEncontrada = cuentas.find((cuenta) => cuenta.user === usuario && cuenta.contrasena === contrasenaIniciar);

        if (cuentaEncontrada) {
            const sesionActiva = {
                user: cuentaEncontrada.user,
                contrasena: cuentaEncontrada.contrasena,
            };
            localStorage.setItem("sesionActiva", JSON.stringify(sesionActiva));
            Swal.fire({
                title: "Sesion Iniciada",
                confirmButtonColor: "#ee82ee",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
        } else {
            setIntentosRestantes(intentosRestantes - 1)
            if (intentosRestantes > 1) {
                Swal.fire({
                    icon: "warning",
                    text: `Usuario o contraseña inválidos. Quedan ${intentosRestantes - 1} intentos.`,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#ee82ee",
                });
                limpiarForm();
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Se ha superado el límite de intentos. Intente más tarde.",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#ee82ee",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            }
        }
    }
    return (
        <div className="formularioLogin">
            <form onSubmit={handleIniciar}>
                <label htmlFor="">Usuario</label>
                <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />

                <label htmlFor="">Contraseña</label>
                <input type="password" value={contrasenaIniciar} onChange={(e) => setContrasenaIniciar(e.target.value)} />
                <button className="btnLogin">Iniciar Sesion</button>
                <p className="pLogin">¿Todavia no tenes cuenta? <Link className="linkLogin" to={"/crearcuenta"}> Crear cuenta</Link></p>

            </form>
        </div>
    )
}

export default LoginIniciar