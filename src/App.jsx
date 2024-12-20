import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./pages/HomePage"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"

const BASE_URL = 'http://localhost:9000';


function App() {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }
      catch {
        alert('Ther was an error loading data ;')
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchCities();
  }, []);




  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="price" element={<Pricing />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities" element={<CityList  cities={cities} isLoading={isLoading}/>} />
          <Route path="countries" element={<p>countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
