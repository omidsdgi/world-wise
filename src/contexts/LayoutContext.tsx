import React, {createContext, useContext, useEffect, useReducer} from "react";
import {CityType} from "@/type/CityType";
import {useRouter} from "next/router";

type State = {
    cities: CityType[],
    currentCity: CityType | null,
    isLoading: boolean,
    error: string
}

type Action =
    | {type: "loading"}
    | {type: "cities/loaded"; payload: CityType[]}
    | {type: "city/loaded"; payload: CityType | null}
    | {type: "city/created"; payload: CityType}
    | {type: "city/deleted"; payload: number}
    | {type: "rejected"; payload: string}

type LayoutContextType = {
    cities: CityType[];
    currentCity: CityType | null;
    isLoading: boolean;
    error: string;
    getCity: (id: string) => Promise<void>;
    deleteCity: (id: number) => Promise<void>;
    createCity: (city: CityType) => Promise<void>;
}

const BASE_URL = "http://localhost:8000"

const initialState: State = {
    cities: [],
    currentCity: null,
    isLoading: false,
    error: "",
}

function reducer(state: State, action: Action): State {
    switch(action.type) {
        case "loading":
            return {...state, isLoading: true}
        case "cities/loaded":
            return {...state, isLoading: false, cities: action.payload}
        case "city/loaded":
            return {...state, isLoading: false, currentCity: action.payload}
        case "city/created":
            return {...state, isLoading: false, cities: [...state.cities, action.payload]}
        case "city/deleted":
            return {...state, isLoading: false, cities: state.cities.filter(c => c.id !== action.payload)}
        case "rejected":
            return {...state, isLoading: false, error: action.payload}
        default:
            throw new Error("Unknown action type");
    }
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

function CitiesProvider({children}: {children: React.ReactNode}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();
    const { id } = router.query as { id?: string };

    useEffect(() => {
        async function fetchCities() {
            dispatch({type: "loading"})
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data: CityType[] = await res.json();
                dispatch({type: "cities/loaded", payload: data})
            } catch {
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading cities..."
                })
            }
        }
        fetchCities();
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (id) {
            getCity(id);
        } else {
            dispatch({type: "city/loaded", payload: null});
        }
    }, [id, router.isReady, cities]);

    async function getCity(id: string) {
        const foundCity = cities.find(city => city.id.toString() === id);
        if (foundCity) {
            dispatch({type: "city/loaded", payload: foundCity});
            return;
        }

        dispatch({type: "loading"});
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data: CityType = await res.json();
            dispatch({type: "city/loaded", payload: data});
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error loading city data...",
            });
        }
    }

    async function createCity(newCity: CityType) {
        dispatch({type: "loading"});
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {"Content-Type": "application/json"}
            });
            const data: CityType = await res.json();
            dispatch({type: "city/created", payload: data});
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error creating the city",
            });
        }
    }

    async function deleteCity(id: number) {
        dispatch({type: "loading"});
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });
            dispatch({type: "city/deleted", payload: id});
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error deleting city",
            });
        }
    }

    return (
        <LayoutContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </LayoutContext.Provider>
    );
}

function useCities() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error("LayoutContext was used outside LayoutProvider");
    }
    return context;
}

export { CitiesProvider, useCities };