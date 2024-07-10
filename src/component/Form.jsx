// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState,useEffect } from "react";

import styles from "./Form.module.css";

import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import useUrlPositions from "../Hooks/useUrlPositions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function FlagEmojiToPNG(flag) {
  if (!/^[a-zA-Z]+$/.test(flag)) {
      flag = Array.from(flag, (codeUnit) => String.fromCharCode(codeUnit.codePointAt() - 127397).toLowerCase()).join('');
  } else {
      flag = flag.toLowerCase();
  }
  return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt='flag' />;
}

function Form() {
  const [cityName, setCityName] = useState("");
  const[isLoadingGeocoding,setIsLoadingGeocoding]=useState();
  const [date, setDate] = useState(new Date());
  const[country,setCountry]=useState("");
  const [notes, setNotes] = useState("");
  const[emoji1,setEmoji1]=useState("");
  const[emoji,setEmoji]=useState("");
  const[lat,lng]=useUrlPositions();
  const[geoCodingError,setGeoCodingError]=useState("");
  const{createCity,isLoading}=useCities();
  const navigate=useNavigate();
 
  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeoCodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error("It not seem like land, click on other locations");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji1(FlagEmojiToPNG(data.countryCode));
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );


async function handleSubmit(e) {
  e.preventDefault();
  if (!cityName || !date) return;

  const newCity = {
    cityName,
    country,
    emoji,
    date,
    notes,
    position: { lat, lng },
  };
  await createCity(newCity);
  navigate("/app/cities");
}

if(isLoadingGeocoding) return <Spinner/>;
if(geoCodingError) return <Message message={geoCodingError}/>;
if(!lat && !lng) return <Message message={"First click anywhere on map"}/>

  return (
    <form className={`${styles.form} ${isLoading?styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{ emoji1 }</span> 
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" onChange={(date)=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
