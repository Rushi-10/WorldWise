import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import "./index.css";
import AppLayout from "./pages/AppLayout";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import City from "./component/City";
import Form from "./component/Form";

function App(){

  

  return( 
   <CitiesProvider>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Homepage/>}/>
   <Route path="pricing" element={<Pricing/>}/>
   <Route path="login" element={<Login/>}/>
   <Route path="product" element={<Product/>}/>
   <Route path="app" element={<AppLayout/>}>
     <Route index element ={<Navigate replace to="cities"/>}/>
      <Route path="cities" element={<CityList/>}/>
      <Route path="cities/:id" element={<City/>}/>
      <Route path="countries" element={<CountryList/>}/>
      <Route path="form" element={<Form/>}/>
   </Route>
   <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
   </CitiesProvider>
  );
}
export default App;
