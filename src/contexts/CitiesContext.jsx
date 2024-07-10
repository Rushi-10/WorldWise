import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
const CitiesContext=createContext();
const BASE_URL="http://localhost:9000";
  function CitiesProvider({children}){
    const[cities,setCities]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[currentCity,setCurrentCity]=useState({});
 
  useEffect(function(){
   async function fetchCities(){
    setIsLoading(true);
    try{
      const res=await fetch(`${BASE_URL}/cities`);
    const data=await res.json();
    setCities(data);
    }catch{
    alert("There is an error while fetching data");
   }finally{
    setIsLoading(false);
   }
  }
  fetchCities();
  },[]);

  async function getCity(id){
    
      
      try{
        setIsLoading(true);
        const res=await fetch(`${BASE_URL}/cities/${id}`);
      const data=await res.json();
      setCurrentCity(data);
      }catch{
      alert("There is an error while fetching data");
     }finally{
      setIsLoading(false);
     }
   
  }
  
  return (<CitiesContext.Provider value={{currentCity,
    cities,
    isLoading,
     getCity, }}>
    {children}
    </CitiesContext.Provider>
);
}
function useCities(){
  const context=useContext(CitiesContext);
  if(context===undefined) 
    throw new Error("Context was used outside the provider");
 
  return context;
}
export {CitiesProvider,useCities};