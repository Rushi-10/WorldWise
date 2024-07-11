import { lazy, Suspense } from "react";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
const Homepage=lazy(()=>import("./pages/Homepage.jsx"));
const Pricing=lazy(()=>import("./pages/Pricing.jsx"));
const Product=lazy(()=>import("./pages/Product.jsx"));
const PageNotFound=lazy(()=>import("./pages/PageNotFound.jsx"));
const Login=lazy(()=>import("./pages/Login.jsx"));
const AppLayout=lazy(()=>import("./pages/AppLayout.jsx"));

import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import "./index.css";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import CityList from "./component/CityList";
import CountryList from "./component/CountryList";
import City from "./component/City";
import Form from "./component/Form";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./component/SpinnerFullPage.jsx";

function App(){

  

  return( 
    <AuthProvider>
   <CitiesProvider>
   <BrowserRouter>
   <Suspense fallback={<SpinnerFullPage/>}>
   <Routes>
   <Route path="/" element={<Homepage/>}/>
   <Route path="pricing" element={<Pricing/>}/>
   <Route path="login" element={<Login/>}/>
   <Route path="product" element={<Product/>}/>
   <Route path="app" element={
   <ProtectedRoute>
   <AppLayout/>
   </ProtectedRoute>
     }>
     <Route index element ={<Navigate replace to="cities"/>}/>
      <Route path="cities" element={<CityList/>}/>
      <Route path="cities/:id" element={<City/>}/>
      <Route path="countries" element={<CountryList/>}/>
      <Route path="form" element={<Form/>}/>
   </Route>
   <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   </Suspense>
   </BrowserRouter>
   </CitiesProvider>
   </AuthProvider>
  );
}
export default App;
