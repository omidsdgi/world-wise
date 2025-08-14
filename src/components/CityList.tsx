import styles from './CityList.module.css'
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import {CityItem} from "@/components/CityItem";
import {useCities} from "@/contexts/LayoutContext";

export function CityList() {
    const { cities, isLoading,currentCity }=useCities()

    if( isLoading)return (<Spinner/>);
    if (!cities.length) return (<Message message="Add your first city by clicking on a city on the map" />);
    if (currentCity) return <Spinner />;

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}
