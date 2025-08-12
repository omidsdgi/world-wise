import styles from './CityItem.module.css'
import Link from "next/link";

interface CityType {
    id: number;
    emoji: string;
    cityName: string;
    date: string; // فرض بر این است که تاریخ به صورت رشته است
}

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
    return (
        <Link href={`/app/cities/${city.id}`}>
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button className={styles.deleteBtn}>X</button>
        </li>
        </Link>
    );
}