import { RouterProvider } from "react-router-dom";
import './bootstrap.css'
import Header from "./components/Header";
import router from "./router/router"

function App() {

  return (
    <>
      <Header/>
      <RouterProvider router={router} />
      <hr/>
    </>
  );
}

export default App;
