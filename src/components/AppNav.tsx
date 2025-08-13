import Link from "next/link";

import styles from './AppNav.module.css'
import {useRouter} from "next/router";
import {CityList} from "@/components/CityList";
import {CountryList} from "@/components/CountryList";
import {CityDetails} from "@/components/CityDetails";
import FormPage from "@/pages/app/form";
import {useLayout} from "@/contexts/LayoutContext";
import {useMemo} from "react";


export  function AppNav() {
    const {cities}=useLayout();

    const { pathname, query } = useRouter();
    const { id } = query;
    const selectedCity = useMemo(
        () => cities.find((city) => city.id.toString() === id?.toString()),
        [cities, id]
    );
    return (
        <>
            <nav>
                <div className={styles.nav}>
                    <ul>
                        <li>
                            <Link href="/app/cities" className={pathname === "/app/cities" ? "active" : ""}>
                                Cities
                            </Link>
                        </li>
                        <li>
                            <Link href="/app/countries" className={pathname === "/app/countries" ? "active" : ""}>
                                Countries
                            </Link>
                        </li>
                    </ul>
                </div>
                {pathname === "/app/cities" && <CityList />}
                {pathname === "/app/countries" && <CountryList />}
                {pathname.startsWith("/app/cities/") && selectedCity && <CityDetails  />}
                {pathname === "/app/form" && <FormPage/>}
            </nav>
        </>
    );
}