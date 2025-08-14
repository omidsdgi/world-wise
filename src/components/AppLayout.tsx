import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";
import {Map} from "@/components/Map";
import {CitiesProvider} from "@/contexts/LayoutContext";



export function AppLayout() {
       return (
        <CitiesProvider>
        <div className={styles.app}>
            <Sidebar/>
            <Map/>
        </div>
        </CitiesProvider>
    );
}

