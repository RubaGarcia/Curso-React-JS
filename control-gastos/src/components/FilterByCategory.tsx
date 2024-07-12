import React from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const{dispatch} = useBudget()
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type:'add-filter-category', payload:{id:e.target.value}})
    }
  return (
    <div className="bg-white shadow-lg rounded-lg p-10 dark:bg-gray-800">

        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5 dark:text-white ">
                <label htmlFor="category">Filtrar gastos</label>
                <select 
                    id="category"
                    className="bg-slate-100 p-3 flex-1 rouned dark:bg-gray-800"
                    onChange={handleChange}
                >
                    <option value="">-- Todas las categorías</option>
                    {categories.map(category => (
                        <option 
                            value={category.id}
                            key={category.id}    
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>

    </div>
  )
}
