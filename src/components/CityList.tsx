import styles from './CityList.module.css'
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import {CityType} from "@/type/CityType";
import {CityItem} from "@/components/CityItem";


interface CityListProps {
    cities: CityType[];
    isLoading: boolean;
}

export function CityList({ cities, isLoading }: CityListProps) {
    if (isLoading) return <Spinner />;
    if (!cities.length) return (<Message message="Add your first city by clicking on a city on the map" />
        );


    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />

            ))}
        </ul>
    );
}
