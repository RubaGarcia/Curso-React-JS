import { categories } from "../data/categories"
import { useState } from "react"
import type {Activity} from"../types" 

export default function Form() {

  const[activity, setActivity]=useState<Activity>({
    category:1,
    name:'',
    calories:0
  })


  const handleChange=(e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>)=>{

    const inNumberField = ['category', 'calories'].includes(e.target.id)

    // console.log(inNumberField)

    setActivity({
      ...activity,
      [e.target.id]:e.target.value
    })
   
  }

  const isValidActivity =() =>{
    const {name, calories} = activity
    return name.trim() !== '' && calories>0
  }


  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">categoria:</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category =>(
            <option
            key={category.id}
            value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input 
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="patatas fritas"
          value={activity.name}
          onChange={handleChange}

        />
      </div>
      
      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">Calorias:</label>
          <input 
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej.987654321"
            value={activity.calories}
            onChange={handleChange}

          />
      </div>


      <input 
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category===1 ? 'guardar comida':'guardar ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  )
}
