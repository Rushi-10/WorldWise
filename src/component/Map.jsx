import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer,Marker,Popup,TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
export default function Map(){
const[seachParams,setSearchParams]=useSearchParams();
const lat=seachParams.get('lat');
const lng=seachParams.get('lng');
const[mapPosition,setMapPosition]=useState([40,0]);

const{cities}=useCities();
useEffect(function(){
if(lat && lng) setMapPosition([lat,lng]);

},[lat,lng]);
return(
    <div className={styles.mapContainer}>
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