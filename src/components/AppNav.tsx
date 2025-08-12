import Link from "next/link";

import styles from './AppNav.module.css'
import {useRouter} from "next/router";
import {CityList} from "@/components/CityList";
import {CountryList} from "@/components/CountryList";
import {CityType} from "@/type/CityType";
import {CityDetails} from "@/components/CityDetails";

interface AppNavProps {
    cities: CityType[];
    isLoading: boolean;
}

export  function AppNav({ cities, isLoading }:AppNavProps) {
    const router = useRouter();
    const currentPath = router.asPath;
    const {id} =router.query;
    const selectedCity = cities.find((city) => city.id.toString() === id?.toString());
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
            {currentPath.startsWith("/app/cities/") && selectedCity && (
                <CityDetails city={selectedCity} isLoading={isLoading} />
            )}
        </nav>

    );
}