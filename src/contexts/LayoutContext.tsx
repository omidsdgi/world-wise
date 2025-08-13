import React, {createContext, useContext, useEffect, useState} from "react";
import {CityType} from "@/type/CityType";

type LayoutContextType = {
    cities: CityType[];
    isLoading: boolean;
}
const LayoutContext=createContext<LayoutContextType | undefined>(undefined);

function CitiesProvider({children}:{children:React.ReactNode}) {

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
        <LayoutContext.Provider value={{
            cities, isLoading
        }}>
    {children}
        </LayoutContext.Provider>
    )
    }
    function  useLayout(){
        const context = useContext(LayoutContext);
        if (context === undefined) throw new Error("LayoutContext was used outside LayoutProvider");
        return context;
}
export {CitiesProvider,useLayout};