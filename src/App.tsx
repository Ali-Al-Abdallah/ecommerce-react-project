import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route element= {<Layout/>}>
          <Route index element= {<HomePage/>} />
        </Route>
     </Routes>
    </BrowserRouter>
  )
} 

