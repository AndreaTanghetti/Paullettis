import { useState, useContext, useEffect } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import { db } from "../../services/config"
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore"
import "./Checkout.css"

const Checkout = () => {

    const { carrito, eliminarCarrito, totalPrecio } = useContext(CarritoContext);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [tlf, setTlf] = useState("");
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    useEffect(() => {
        const cargarDatosCuenta = async () => {
            const sesionActiva = JSON.parse(localStorage.getItem("sesionActiva"));

            if (sesionActiva) {
                const cuentasJson = localStorage.getItem("cuentas");
                const cuentas = cuentasJson ? JSON.parse(cuentasJson) : [];
                const cuentaEncontrada = cuentas.find((cuenta) => {
                    setNombre(cuenta.nombre);
                    setApellido(cuenta.apellido);
                    setTlf(cuenta.telefono);
                    setEmail(cuenta.correo);
                    setEmailConf(cuenta.correo);
                });
            }
        };

        cargarDatosCuenta();
    }, []);



    const resetForm = () => {
        setNombre("");
        setApellido("");
        setTlf("");
        setEmail("");
        setEmailConf("");
    };

    const handlerForm = (event) => {
        event.preventDefault()
        if (!nombre || !apellido || !tlf || !email || !emailConf) {
            setError("Alguno de los campos esta vacio!")
            return;
        }


        if (emailConf !== email) {
            setError("Por favor verifique que el correo electronico coincida. ")
            return;
        }


        const orden = {
            item: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                precio: producto.item.precio,
                cantidad: producto.cantidad,
            })),
            total: carrito.reduce((total, producto) => total + producto.item.precio * producto.cantidad, 0),
            nombre,
            apellido,
            tlf,
            email,
            fecha: new Date(),
        };

        Promise.all(
            orden.item.map(async (productoOrden) => {
                const productoRef = doc(db, "productos", productoOrden.id);
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad,
                })
            })
        )

            .then(() => {
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id)
                        eliminarCarrito();
                        resetForm();
                    })
                    .catch((error) => {
                        console.log(("Ups! Algo salio mal!", error));
                        setError("Error al crear la orden");
                    })
            })
            .catch((error) => {
                console.log(("Ups! Algo salio mal!"), error);
                setError("Error al actulizar stock");
            })
    }

    return (
        <div>
            {
                ordenId && (
                    <strong className="envioExitoso">Gracias por tu compra! <br />Nº de orden: {ordenId}</strong>
                )
            }
            <form onSubmit={handlerForm}>

                <h2>Resumen de compra</h2>
                {carrito.map(producto => (
                    <div className="resumenCompra" key={producto.item.id}>
                        <p> {producto.item.nombre} x {producto.cantidad}</p>
                        <p>Precio unitario ${producto.item.precio}</p>
                        <p> Total ${producto.item.precio * producto.cantidad}</p>
                        <hr />

                    </div>
                ))}
                <p className="pResumen">Total a pagar ${totalPrecio}</p>

                <div className="formulario">
                    {
                        (localStorage.getItem("sesionActiva")) ? <h2>Validacion de datos</h2> : <h2>Datos de contacto</h2>
                    }                    
                <div >
                        <label htmlFor="">Nombre</label>
                        <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Apellido</label>
                        <input type="text" value={apellido} onChange={(event) => setApellido(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Telefono</label>
                        <input type="Tel" value={tlf} onChange={(event) => setTlf(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Correo Electronico</label>
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Repetir Correo Electronico</label>
                        <input type="email" value={emailConf} onChange={(event) => setEmailConf(event.target.value)} />
                    </div>
                </div>


                {error && <p className="error">UPS! Algo salio mal <br />{error}</p>}


                <button className="finalizar" type="submit">Finalizar Compra</button>

            </form>
        </div>
    )
}

export default Checkout