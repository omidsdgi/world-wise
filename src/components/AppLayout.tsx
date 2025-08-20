import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";
import {MapComponent} from "@/components/Map";
import React from "react";
import User from "@/components/User";



export function AppLayout() {
    return (

            <div className={styles.app}>
                <Sidebar />
              <MapComponent />
                <User/>
            </div>

    );
}
