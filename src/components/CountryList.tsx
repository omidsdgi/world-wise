import styles from './CountryList.module.css'
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import CountryItem from "@/components/CountryItem";
import {CityType} from "@/type/CityType";
import {useLayout} from "@/contexts/LayoutContext";

interface CountryListProps {
    cities: CityType[];
    isLoading: boolean;
}

interface CountryProps  {
    country: string;
    emoji: string;
};
export  function CountryList() {
    const {cities,isLoading}=useLayout()
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