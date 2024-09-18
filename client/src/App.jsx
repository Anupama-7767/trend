import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [id, setid] = useState(0)
  const [memo, setMemo] = useState("")

  const handleSave = async () => {
    const data = { id: id, memo: memo }
    const res = await fetch("http://localhost:5000/reg", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const responce = await res.json()
    console.log(responce)
  }

  return (
    <>
      <span>
        <input type="number" value={id} onChange={(e) => {
          setid(e.target.value)
        }} />
        <input type="text" value={memo} onChange={({ target: { value } }) => {
          setMemo(value)
        }} />
        <button onClick={() => {
          handleSave()
        }}>save memo</button>
      </span >
    </>
  )
}

export default App
