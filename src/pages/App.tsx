import {ReactNode} from "react";
import styles from './AppLayout.module.css'
import {Map, Sidebar} from "@/components";


export default function AppLayout({children}: {children: ReactNode}) {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map/>
        </div>
    );
}