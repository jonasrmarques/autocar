import { useState, useEffect } from "react"
import './App.css'
import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'

const url = "http://localhost:3000/autos"

function App() {
   const [auto, setAuto] = useState([])
   const [marca, setMark] = useState("")
   const [modelo, setModels] = useState("")
   const [preco, setPrice] = useState("")
   const [ano, setYear] = useState("")
   const [editModels, setEditModels] = useState(false)
   const [editId, setEditId] = useState(null)

  
  useEffect(() => {
    async function fetchData(){
      const resp = await fetch(url)
      const data = await resp.json()
      setAuto(data)
    }
    fetchData()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const autos = { marca, modelo, preco: parseFloat(preco), ano: parseInt(ano)}
    let res

    if(editModels){
      res = await fetch(`${url}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(autos)
      })

      setEditModels(false)
      setEditId(null)
    } else {
      res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(autos),
      })
    }

    const data = await res.json()
    setAuto((prevAuto) =>{
      if(editModels){
        return prevAuto.map((a) => (a.id === editId ? data : a))
      } else {
        return [...prevAuto, data]
      }
    })

    setMark("")
    setModels("")
    setPrice("")
    setYear("")
  }

  const handleDelete = async (id) => {
    await fetch(`${url}/${id}`,{
      method: "DELETE",
    })

    setAuto((prevAuto) => prevAuto.filter((autos) => autos.id !== id))
  }

  const handleEdit = (autos) => {
    setMark(autos.marca)
    setModels(autos.modelo)
    setPrice(autos.preco)
    setYear(autos.ano)
    setEditId(autos.id)
    setEditModels(true)
  }

  return (
    <>
      <Header />
      
      <Body
      auto={auto}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      marca={marca}
      modelo={modelo}
      preco={preco}
      ano={ano}
      handleSubmit={handleSubmit}
      setMark={setMark}
      setModels={setModels}
      setPrice={setPrice}
      setYear={setYear}
      editModels={editModels}
      />
      <Footer />
    </>
  )
}

export default App
