import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import BudgetTracker from "./components/BudgetTracker"
import { useBudget } from "./hooks/useBudget"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"
function App() {

  // const context = useContext(BudgetContext)
  // console.log(context)
  const {state} = useBudget()
  // console.log(state.budget)
  const isValidBudget = useMemo(() => state.budget > 0,[state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  },[state])



  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72 dark:bg-gray-800">
        <h1 className="uppercase text-center font-thin text-4xl text-white ">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10 dark:bg-gray-800">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
      </div>

      {isValidBudget &&(
        <main className="max-w-3xl mx-auto py-10 dark:bg-slate-900">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
