import {useEffect, useState} from "react";
import Link from "next/link";

import styles from './AppNav.module.css'
import {useRouter} from "next/router";
import {CityList} from "@/components/CityList";
import {CountryList} from "@/components/CountryList";

const BASE_URL= "http://localhost:8000"

export  function AppNav() {
    const[cities,setCities]=useState([])
    const[isLoading,setIsLoading]=useState(false)

    const router = useRouter();
    const currentPath = router.asPath;

    useEffect(()=>{
        async function fetchCities(){
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            }
            catch{
                alert("There was an error loading data...");
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchCities()
    },[setCities])
    return (
        <nav>
            <div className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/app/cities" className={currentPath === "/app/cities" ? "active" : ""}>
                            Cities
                        </Link>
                    </li>
                    <li>
                        <Link href="/app/countries" className={currentPath === "/app/countries" ? "active" : ""}>
                            Countries
                        </Link>
                    </li>
                </ul>
            </div>
            {currentPath === "/app/cities" && (
                <CityList cities={cities} isLoading={isLoading}/>
            )}

            {currentPath === "/app/countries" && (
                <CountryList cities={cities} isLoading={isLoading}/>
            )}
        </nav>

    );
}