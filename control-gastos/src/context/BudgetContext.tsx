import { useReducer, createContext, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"


type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}


export const BudgetContext =createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}:BudgetProviderProps) => {
    
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // const{state} = useBudget()
    const totalExpenses = useMemo(()=> state.expenses.reduce((total, expense) => total + expense.amount, 0),[state.expenses])
    const remainingBudget = useMemo(()=> state.budget - totalExpenses, [state, totalExpenses])

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}