
import Sidebar from "../component/Sidebar";
import Map from "../component/Map";
import styles from "../pages/AppLayout.module.css";
import User from "../component/User";
export default function AppLayout(){
    return(
        <div className={styles.app}>
        <Sidebar/>
        <Map/>
        <User/>
        </div>
    );
} 