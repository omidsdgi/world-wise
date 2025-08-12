import styles from "./Sidebar.module.css"
import {Logo} from "@/components/Logo";
import {AppNav} from "@/components/AppNav";
import React from "react";
import {CityType} from "@/type/CityType";
import {useRouter} from "next/router";
import {CountryList} from "@/components/CountryList";
import {CityList} from "@/components/CityList";
import {CityDetails} from "@/components/CityDetails";

interface SidebarProps {
    cities: CityType[];
    isLoading: boolean;
}
export function Sidebar({cities, isLoading}: SidebarProps) {
    // const router = useRouter();
    // const { pathname, query } = router;
    //
    // const renderSidebarContent = () => {
    //     // جزئیات شهر خاص
    //     if (pathname === "/app/cities/[id]" && query.id) {
    //         const cityId = Number(query.id);
    //         const selectedCity = cities.find(cities => cities.id === cityId);
    //         return <CityDetails cities={selectedCity} cities={cities} isLoading={isLoading} />;
    //     }
    //
    //     // لیست کشورها
    //     if (pathname === "/app/countries") {
    //         return <CountryList cities={cities} isLoading={isLoading} />;
    //     }
    //
    //     // لیست شهرها (حالت پیش‌فرض)
    //     return <CityList cities={cities} isLoading={isLoading} />;
    // };
    console.log("Props in Sidebar:", { cities, isLoading });
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