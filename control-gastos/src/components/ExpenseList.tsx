import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {
    const {state} = useBudget()
    
    
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty=useMemo(()=>filteredExpenses.length===0,[filteredExpenses])
    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10 dark:bg-gray-800">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold dark:text-gray-300">No hay gastos</p>
            : (
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5 dark:text-gray-300">
                        Lista de Gastos
                    </p>
                    {filteredExpenses.map(expense=>(
                        <ExpenseDetail 
                            key={expense.id}
                            expense={expense}
                        />
                    ))}
                </>
            )}
        </div>
    
  )
}
