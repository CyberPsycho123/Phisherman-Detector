import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./compenents/Home";
import Notpage from "./compenents/Notpage";
const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Home/></>
    },
    {
      path:"*",
      element:<><Notpage/></>
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
