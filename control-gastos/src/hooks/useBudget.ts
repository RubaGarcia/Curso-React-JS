import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context){
        throw new Error ('use tiene que tener movidas')
    }
    return context
}