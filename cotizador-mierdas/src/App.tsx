import { useEffect } from "react"
import CriptoSearchForm from "./components/CriptoSearchForm"
import { useCryptStore } from "./store"
import { CryptoPriceDisplay } from "./components/CryptoPriceDisplay"

function App() {
  const fetchCryptos = useCryptStore((state:any)=>state.fetchCryptos)

  useEffect(()=>{
    fetchCryptos()
  },[])


  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Cryptos</span>
        </h1>
        <div className="content">
          <CriptoSearchForm/>
          <CryptoPriceDisplay/>
        </div>
      </div>
    </>
  )
}

export default App
