import styles from "./Sidebar.module.css"
import {Logo} from "@/components/Logo";
import {AppNav} from "@/components/AppNav";
import React from "react";


export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav />

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}