import styles from './CityItem.module.css'

const formatDate=(date)=>
    new Intl.DateTimeFormat('en-US',{
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}).format( new Date (date))

export  function CityItem({city}) {
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button className={styles.deleteBtn}>X</button>
        </li>
    );
}