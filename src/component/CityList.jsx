/* eslint-disable react/prop-types */

import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

import {useCities} from "../contexts/CitiesContext";
export default function CityList(){
    const{ cities, isLoading}=useCities(); 
     console.log(cities);
    if(isLoading) return <Spinner/>;
    
    if(!cities.length) return <Message message={"First add the city using map."}/>;
    return(
         
         <ul className={styles.cityList}>
       {cities.map((city)=>(<CityItem city={city} key={city.id}/>))}
        </ul>
    );
}