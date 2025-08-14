import styles from './CityItem.module.css'
import Link from "next/link";
import {CityType} from "@/type/CityType";
import {useCities} from "@/contexts/LayoutContext";


interface CityItemProps {
    city: CityType
}

const formatDate=(date:string)=>
    new Intl.DateTimeFormat('en-US',{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format( new Date (date))

export  function CityItem({city}:CityItemProps) {
    const {currentCity}=useCities()
    const isActive = currentCity?.id === city.id;

    console.log('CityItem render:', city.cityName, 'currentCity:', currentCity?.cityName, 'isActive:', isActive);
    return (
        <Link href={{
            pathname: `/app/cities/${city.id}`,
            query: { lat: city.position.lat, lng: city.position.lng }
        }}>
            <li className={`${styles.cityItem} ${isActive? styles["cityItem--active"]:''}`}>
                <span className={styles.emoji}>{city.emoji}</span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>{formatDate(city.date)}</time>
                <button className={styles.deleteBtn}>X</button>
            </li>
        </Link>

    );
}