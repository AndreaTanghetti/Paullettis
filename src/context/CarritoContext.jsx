import { useState, createContext } from "react";

export const CarritoContext = createContext({
  carrito: [],
  total: 0,
  cantTotal: 0
});

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const [totalPrecio, setTotalPrecio] = useState(0);

  const [cantTotal, setCantTotal] = useState(0);



  // AGREGO PRODUCTOS AL CARRITO
  const agregarProd = (item, cantidad) => {

    const productoExistente = carrito.find(prod => prod.item.id === item.id);

    if (!productoExistente) {
      setCarrito(prevCarrito => [...prevCarrito, { item, cantidad }]);
      setCantTotal(prev => prev + cantidad);
      setTotalPrecio(prev => prev + (item.precio) * cantidad);
    } else {
      const actualizarCarrito = carrito.map(prod => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + cantidad };
        }
        else {
          return prod;
        }
      });
      setCarrito(actualizarCarrito);
      setCantTotal(prev => prev + cantidad);
      setTotalPrecio(prev => prev + (item.precio * cantidad));
    }
  };

  // RESTO DE A UN PROD
  const restarProd = (item, cantidad) => {
    const productoExistente = carrito.find(prod => prod.item.id === item.id);

    if (productoExistente) {
      if (productoExistente.cantidad > cantidad) {
        const actualizarCarrito = carrito.map(prod => {
          if (prod.item.id === item.id) {
            return { ...prod, cantidad: prod.cantidad - cantidad };
          } else {
            return prod;
          }
        });
        setCarrito(actualizarCarrito);
        setCantTotal(prev => prev - cantidad);
        setTotalPrecio(prev => prev - item.precio * cantidad);
      } else {
        eliminar(item.id);
      }
    }
  };


  // SUMO DE A UN PROD
  const sumarProd = (item) => {
    const productoExistente = carrito.find(prod => prod.item.id === item.id);

    if (productoExistente) {
      const actualizarCarrito = carrito.map(prod => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + 1 };
        } else {
          return prod;
        }
      });
      setCarrito(actualizarCarrito);
      setCantTotal(prev => prev + 1);
      setTotalPrecio(prev => prev + item.precio);
    }
  };



  // ELIMINO CANT TOTAL DE UN PROD
  const eliminar = (id) => {
    const productoEliminado = carrito.find(prod => prod.item.id === id);
    const actualizarCarrito = carrito.filter(prod => prod.item.id !== id);
    setCarrito(actualizarCarrito);
    setCantTotal(prev => prev - productoEliminado.cantidad);
    setTotalPrecio(prev => prev - (productoEliminado.item.precio * productoEliminado.cantidad));
  }


  // ELIMINO EL CARRITO COMPLETO
  const eliminarCarrito = () => {
    setCarrito([]);
    setCantTotal(0);
    setTotalPrecio(0);
  }



  return (
    <CarritoContext.Provider value={{ carrito, agregarProd, eliminar, eliminarCarrito, totalPrecio, cantTotal, restarProd, sumarProd }}>
      {children}
    </CarritoContext.Provider>
  )
}



