import { useState, ChangeEvent, useMemo } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

    const[budget,setBudget] = useState(0)
    const{dispatch} = useBudget()


    // useEffect(() => {
    //     if(state.editingId){
    //         const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
    //         setExpense(editingExpense)
    //     }
    // },[state.editingId])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault()
        setBudget(e.target.valueAsNumber)
        // console.log(e.target.value)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type:'add-budget', payload:{budget}})
    }



    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-semibold text-center dark:text-white">
                    Definir Presupuesto
                </label>
                <input 
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2 dark:bg-slate-800 dark:border-slate-700"
                    placeholder="Ingresa tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-thin uppercase disabled:opacity-40 dark:bg-blue-700 dark:hover:bg-blue-900"
                disabled={isValid}
            />
        </form>

    )
}
// function setExpense(editingExpense: Expense) {
//     throw new Error("Function not implemented.")
// }

