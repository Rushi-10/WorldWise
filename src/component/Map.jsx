import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer,Marker,Popup,TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../Hooks/useGeolocation";
import useUrlPositions from "../Hooks/useUrlPositions";
export default function Map(){

const[mapPosition,setMapPosition]=useState([40,0]);
const{cities}=useCities();
const[lat,lng]=useUrlPositions();
useEffect(function(){
if(lat && lng) setMapPosition([lat,lng]);
},[lat,lng]);

const{isLoading,position,getPosition}=useGeolocation();

useEffect(function(){
if(position) setMapPosition([position.lat,position.lng]);
},[position])
return(
    <div className={styles.mapContainer}>
    {!position && <Button type="position" onClick={getPosition}>
    {isLoading?"Loading...":"Use your location"}
    </Button>
}
    <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>
    <Marker position={[city.position.lat,city.position.lng]}
    key={city.id}
    >
    <Popup>
    This is I visited city.
    </Popup>
    </Marker>
    )}
    <ChangeCenter position={mapPosition}/>
    <DetectClick/>
  </MapContainer>
  </div>
);
}
function ChangeCenter({position}){
  const map=useMap();
  map.setView(position);
  return null;
}
function DetectClick(){
  const navigate=useNavigate();
  useMapEvents({
    click:(e)=>{
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

    },
  });
}