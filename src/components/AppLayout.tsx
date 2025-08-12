// import { ReactNode, useEffect, useState } from "react";
// import { Sidebar } from "./Sidebar";
// import { Map } from "./Map";
// import {CityType} from "@/type/CityType";
//

//
// interface AppLayoutProps {
//     children?: ReactNode;
// }
//
// export function AppLayout({ children }: AppLayoutProps) {
//     const [cities, setCities] = useState<CityType[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//
//     useEffect(() => {
//         async function fetchCities() {
//             try {
//                 setIsLoading(true);
//                 const res = await fetch(`${BASE_URL}/cities`);
//                 const data: City[] = await res.json();
//                 setCities(data);
//             } catch {
//                 alert("There was an error loading data...");
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//         fetchCities();
//     }, []);
//
//     return (
//         <div className={styles.app}>
//             <Sidebar cities={cities} isLoading={isLoading} />
//             <Map />
//             {typeof children === "function" ? children({ cities, isLoading }) : children}
//         </div>
//     );
// }


import React, { ReactNode, useEffect, useState } from "react";
import styles from "./AppLayout.module.css";
import { Sidebar } from "./Sidebar";
import {CityType} from "@/type/CityType";
import {Map} from "@/components/Map";

// import {useRouter} from "next/router";


interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({children}: AppLayoutProps) {
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
            {/*<main className={styles.main}>*/}
            {/*    /!* children مثلاً صفحه CitiesPage که پراپ cities دریافت می‌کند *!/*/}
            {/*    {children}*/}
            {/*</main>*/}

        </div>
    );
}

