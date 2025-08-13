import styles from './Map.module.css'

import { useRouter } from 'next/router';

export function Map() {
    const router = useRouter();

    const handleMapClick = () => {
        // مختصات دلخواه جدید برای نمونه
        const newLat = 35.6895;  // مثلا تهران
        const newLng = 51.3890;

        router.push({
            pathname: "/app/form",
            query: {newLat, newLng}
        });
    };

    return (
        <div
            className={styles.mapContainer}
            onClick={handleMapClick}
            style={{cursor: "pointer"}}
        >
            <h1>Map</h1>
            <h2>Click anywhere to add a city</h2>
        </div>
    );
}
