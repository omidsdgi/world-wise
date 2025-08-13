import styles from "./Sidebar.module.css"
import {Logo} from "@/components/Logo";
import {AppNav} from "@/components/AppNav";
import React from "react";
import {CityType} from "@/type/CityType";


interface SidebarProps {
    cities: CityType[];
    isLoading: boolean;
}
export function Sidebar({cities, isLoading}: SidebarProps) {

    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav cities={cities} isLoading={isLoading}/>
            {/*{renderSidebarContent()}*/}

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}