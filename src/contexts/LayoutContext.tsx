import React, {createContext, useContext, useEffect, useState} from "react";
import {CityType} from "@/type/CityType";
import {useRouter} from "next/router";

type LayoutContextType = {
    cities: CityType[];
    currentCity: CityType | null;
    isLoading: boolean;
    getCity: (id: string) => Promise<void>;
}
const LayoutContext=createContext<LayoutContextType | undefined>(undefined);

function CitiesProvider({children}:{children:React.ReactNode}) {

    const [cities, setCities] = useState<CityType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const[currentCity,setCurrentCity]=useState<CityType | null>(null)

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

    async function getCity(id:string) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            if (!res.ok) throw new Error("Network error");
            const data: CityType = await res.json();
            setCurrentCity(data);
        } catch {
            alert("There was an error loading data...");
        } finally {
            setIsLoading(false);
        }
    }
    const router = useRouter();
    const { id } = router.query as { id?: string };
    useEffect(() => {
        if (id){
        getCity(id);
        }else {
            setCurrentCity(null);
        }
    }, [id]);

    useEffect(() => {
        console.log('currentCity updated:', currentCity);
    }, [currentCity]);
    return (
        <LayoutContext.Provider value={{
            cities, isLoading,currentCity,getCity
        }}>
            {children}
        </LayoutContext.Provider>
    )
}
function  useCities(){
    const context = useContext(LayoutContext);
    if (context === undefined) throw new Error("LayoutContext was used outside LayoutProvider");
    return context;
}
export {CitiesProvider,useCities};