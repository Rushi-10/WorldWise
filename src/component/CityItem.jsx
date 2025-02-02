/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
export default function CityItem({city}){
    const formatDate = (date) =>
        new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(date));
        const flagemojiToPNG = (flag) => {
            var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
            return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
        }
          
     const{currentCity,deleteCity}=useCities(); 
    const{cityName,emoji,date,id,position}=city;
    function handleDelete(e){
        e.preventDefault();
        deleteCity(id);
    }
    return(
        <li>
        <Link className={`${styles.cityItem} ${id===currentCity.id? styles["cityItem--active"]:''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleDelete} className="deleteBtn">&times;</button>
        </Link>
       
        </li>
    );
}