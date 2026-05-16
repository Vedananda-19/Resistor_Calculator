import {createBrowserRouter , RouterProvider} from "react-router-dom"
import CalculatorPage from "../pages/CalculatorPage"
import HistoryPage from "../pages/HistoryPage"

const router = createBrowserRouter([
    {
        path : "/",
        element : <CalculatorPage />
    },
    {
        path : "/history",
        element : <HistoryPage />
    }
])

function App(){
    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App