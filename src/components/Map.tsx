// import styles from './Map.module.css'
// import {useRouter} from "next/router";
//
//
// export function Map() {
//     const router=useRouter();
//     const {lat,lng}=router.query;
//     return (
//         <div className={styles.mapContainer}>
//             <h1>Map</h1>
//             {lat && lng ? (
//                 <h2>
//                     Position: {lat}, {lng}
//                 </h2>
//             ) : (
//                 <p>No location selected</p>
//             )}
//         </div>
//     );
// }

import { useRouter } from 'next/router';

export function Map() {
    const router = useRouter();
    const { lat: latQuery, lng: lngQuery } = router.query;

    const handleChangePosition = () => {
        // مختصات دلخواه جدید برای نمونه
        const newLat = 35.6895;  // مثلا تهران
        const newLng = 51.3890;

        router.replace({
            pathname: router.pathname,
            query: { ...router.query, lat: newLat, lng: newLng },
        }, undefined, { shallow: true });
    };

    return (
        <div className="mapContainer">
            <h1>Map</h1>
            <h2>Position: {latQuery}, {lngQuery}</h2>
            <button onClick={handleChangePosition}>
                Change Position to Tehran
            </button>
        </div>
    );
}
