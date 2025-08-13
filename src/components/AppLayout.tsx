import React, { useEffect, useState } from "react";
import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";
import {CityType} from "@/type/CityType";
import {Map} from "@/components/Map";



export function AppLayout() {
    const [cities, setCities] = useState<CityType[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch("http://localhost:8000/cities");
                if (!res.ok) throw new Error("Network error");
                const data:CityType[] = await res.json();
                setCities(data);
            } catch  {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();

    }, []);

    return (
        <div className={styles.app}>
            <Sidebar cities={cities} isLoading={isLoading}/>
            <Map/>
        </div>
    );
}

