import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../../services/config"

const ItemListConteiner = () => {
  const [productos, setProductos] = useState([]);

  const { idCat } = useParams();


  useEffect(() => {
    const misProductos = idCat ? query(collection(db, "productos"), where("idCat", "==", idCat)) : collection(db, "productos");

    getDocs(misProductos)
      .then(resp => {
        const nuevosProductos = resp.docs.map(doc => {
          const data = doc.data()
          return { id: doc.id, ...data }
        })
        setProductos(nuevosProductos)
      })

  }, [idCat])


  return (
    <div >
      <ItemList productos={productos} />
    </div>
  )
}

export default ItemListConteiner