
import axios from 'axios';
import { SearchType } from '../types';
import { z } from 'zod';
import { useMemo, useState } from 'react';
// import {object, string, number, Output, parse} from 'valibot'


// function isWeatherResponse(weather:unknown): weather is Weather{
//     return(
//         Boolean(weather)&&
//         typeof weather === 'object'&&
//         typeof (weather as Weather).name === 'string'&&
//         typeof (weather as Weather).main.temp === 'number'&&
//         typeof (weather as Weather).main.temp_max === 'number'&&
//         typeof (weather as Weather).main.temp_min === 'number'

//     )
// }

//zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})
export type Weather = z.infer<typeof Weather>

//valibot
// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })

// })
// type Weather = Output<typeof WeatherSchema>


const initialState = {
    name:'',
    main:{
        temp:0,
        temp_max:0,
        temp_min:0
    }
}

export  default function useWeather() {
    
    const [weather, setWeather] = useState<Weather>(initialState)
    const[loading, setLoading] = useState(false)
    const[notFound, setNotFound] = useState(false)

    const fetchWeather = async (search:SearchType) => {

        const appId = import.meta.env.VITE_API_KEY

        setLoading(true)
        setWeather(initialState)
        try{
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            
            const {data} = await axios.get(geoUrl)

            if(!data[0]){
                setNotFound(true)
                return
            }


            const lat = data[0].lat
            const lon = data[0].lon
            // console.log(data)

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            //Type guards
            // const {data:weatherResult} = await axios.get<Weather>(weatherUrl)
            // const result = isWeatherResponse(weatherResult)
            // if(result){
            //     console.log(weatherResult.main)
            // } else{
            //     console.error('Invalid weather response')
            // }

            //Zod
            const {data:weatherResult} = await axios.get(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            console.log(result)
            if (result.success){
                setWeather(result.data)
            }
            
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }

    }

    const hasWeatherData = useMemo(()=>weather.name, [weather])
    return{
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}