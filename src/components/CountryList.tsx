import styles from './CountryList.module.css'
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import CountryItem from "@/components/CountryItem";
import {useCities} from "@/contexts/LayoutContext";


interface CountryProps  {
    country: string;
    emoji: string;
};
export  function CountryList() {
    const {cities,isLoading}=useCities()
    if (isLoading) return<Spinner />;
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>;

    const countries:CountryProps[] = cities.reduce<CountryProps[]>((arr, city) => {
        if (!arr.map((el)=>el.country).includes(city.country))
            return [...arr, {country: city.country,emoji: city.emoji}];
        else return arr;
    },[])

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (<CountryItem key={country.country} country={country} />))}
        </ul>
    );
}