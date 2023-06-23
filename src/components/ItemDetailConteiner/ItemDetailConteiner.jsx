import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/config"

const ItemDetailConteiner = () => {
  const [producto, setProducto] = useState(null)

  const { id } = useParams();

  useEffect(() => {
    const nuevoDoc = doc(db, "productos", id)

    getDoc(nuevoDoc)
      .then(resp => {
        const data = resp.data();
        const nuevosProducto = { id: resp, id, ...data }
        setProducto(nuevosProducto)
      })
  }, [id])


  return (
    <div>
      <ItemDetail {...producto} />
    </div>
  )
}

export default ItemDetailConteiner