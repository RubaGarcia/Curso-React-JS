import Form from "./components/Form.tsx"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer.ts"
import ActivityList from "./components/ActivityList.tsx"
import CalorieTracker from "./components/CalorieTracker.tsx"

function App() {

  const[state,dispatch]=useReducer(activityReducer,initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  },[state.activities])
  console.log(state)
  
  const canRestartApp = () => useMemo(()=>state.activities.length>0, [state.activities])


  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>
          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursos-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({type:'restart-app'})}
          >
            Reiniciar app
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        {/* <div> */}
          <ActivityList
            activities={state.activities}
            dispatch={dispatch}
          />
        {/* </div> */}
      </section>
    </>
  )
}

export default App
