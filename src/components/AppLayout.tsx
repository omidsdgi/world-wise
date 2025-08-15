import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";
import {CitiesProvider} from "@/contexts/LayoutContext";
import {MapComponent} from "@/components/Map";



export function AppLayout() {
    return (
        <CitiesProvider>
            <div className={styles.app}>
                <Sidebar />
                <MapComponent />
            </div>
        </CitiesProvider>
    );
}
