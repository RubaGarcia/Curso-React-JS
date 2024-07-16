import { create } from "zustand"
import { CryptoCurrency, CryptoPrice, Pair } from "./types"
import { devtools } from "zustand/middleware"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoSrevice"


type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    result:CryptoPrice
    loading:boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair:Pair) => Promise<void>
}

export const useCryptStore = create<CryptoStore>()(devtools((set) =>({
    cryptocurrencies:[],
    result:{
        IMAGEURL:'',
        PRICE:'',
        HIGHDAY:'',
        LOWDAY:'',
        CHANGEPCT24HOUR:'',
        LASTUPDATE:''
    },
    loading:false,
    fetchCryptos: async () => {
        const cryptos = await getCryptos()
        set(()=>({
            cryptocurrencies:cryptos
        }))
    },
    fetchData:async(pair) => {
        set(()=>({
            loading : true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        // console.log(result)
        set(()=>({
            result,
            loading: false
        }))
    }
})))