import { useSearchParams } from "react-router-dom";

export default function useUrlPosition(){
const[seachParams]=useSearchParams();
const lat=seachParams.get('lat');
const lng=seachParams.get('lng');
return [lat,lng];

}