import { useMemo } from "react";
import { useCryptStore } from "../store";
import { Spinner } from "./Spinner";


export const CryptoPriceDisplay = () => {

    const result = useCryptStore((state) => state.result)
    const loading = useCryptStore((state) => state.loading)

    const hasResult = useMemo(()=> !Object.values(result).includes(''), [result])
   

    return(
        <div className="result-wrapper">
            {loading ? <Spinner /> : hasResult &&(
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img 
                            src={`https://cryptocompare.com/${result.IMAGEURL}`} 
                            alt="imagen de la criptomoneda" 
                        />
                        <div>
                            <p>El precio es de : <span>{result.PRICE}</span></p>
                            <p>Precio más alto del día:<span> {result.HIGHDAY}</span></p>
                            <p>Precio más bajo del día:<span> {result.LOWDAY}</span></p>
                            <p>Cambio en las últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{result.LASTUPDATE}</span></p>
                            
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};
