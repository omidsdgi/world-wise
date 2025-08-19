import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";
import {CitiesProvider} from "@/contexts/LayoutContext";
import {MapComponent} from "@/components/Map";
import React from "react";
import User from "@/components/User";



export function AppLayout() {
    return (
        <CitiesProvider>
            <div className={styles.app}>
                <Sidebar />
              <MapComponent />
                <User/>
            </div>
        </CitiesProvider>
    );
}
