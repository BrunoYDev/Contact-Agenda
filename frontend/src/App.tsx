import { ToastContainer } from "react-toastify"
import { RoutesMain } from "./routes"
import GlobalStyles from "./styles/GlobalStyles"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <GlobalStyles/>
      <ToastContainer/>
      <RoutesMain/>
    </>
  )
}

export default App
