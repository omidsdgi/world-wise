import React, {createContext, useContext, useEffect, useState} from "react";
import {CityType} from "@/type/CityType";
import {useRouter} from "next/router";

type LayoutContextType = {
    cities: CityType[];
    currentCity: CityType | null;
    isLoading: boolean;
    getCity: (id: number) => Promise<void>;
    deleteCity:(id:number)=>Promise<void>;
    createCity:(id:number)=>Promise<void>;
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

    async function getCity(id: string) {
        const foundCity = cities.find(city => city.id.toString() === id);

        if (foundCity) {
            setCurrentCity(foundCity);
            return;
        }
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            if (!res.ok) throw new Error("Network error");
            const data: CityType = await res.json();
            setCurrentCity(data);
        } catch {
            alert("There was an error loading city data...");
        } finally {
            setIsLoading(false);
        }
    }
    const router = useRouter();
    const { id } = router.query as { id?: string };

    useEffect(() => {

        if (id && router.isReady) {
            getCity(id);
        } else if (!id) {
            setCurrentCity(null);
        }
    }, [id, router.isReady, cities, getCity]);

    useEffect(() => {
    }, [currentCity]);

    async function createCity(newCity: CityType) {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8000/cities`,{
                method:"POST",
                body:JSON.stringify(newCity),
                headers:{"Content-Type":"application/json"}
            });
            const data: CityType = await res.json();
            setCities((cities)=>[...cities, data]);
        } catch {
            alert("There was an error loading city data...");
        } finally {
            setIsLoading(false);
        }
    }
    async function deleteCity(id:number) {
        try {
            setIsLoading(true);
            await fetch(`http://localhost:8000/cities/${id}`,{
                method:"DELETE"
            });
            setCities((cities)=>cities.filter(c=>c.id !== id));
        } catch {
            alert("There was an error deleting city ");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <LayoutContext.Provider value={{
            cities, isLoading,currentCity,getCity,createCity,deleteCity
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