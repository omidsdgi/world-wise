import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './Map.module.css';

// Leaflet components را dynamic import کن
const MapContainer = dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    { ssr: false }
);

const TileLayer = dynamic(
    () => import('react-leaflet').then(mod => mod.TileLayer),
    { ssr: false }
);

const Marker = dynamic(
    () => import('react-leaflet').then(mod => mod.Marker),
    { ssr: false }
);

const Popup = dynamic(
    () => import('react-leaflet').then(mod => mod.Popup),
    { ssr: false }
);

export function MapComponent() {
    const [mapPosition] = useState<[number, number]>([40, 0]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className={styles.mapContainer}>
                <div style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-light--2)'
                }}>
                    Loading Map...
                </div>
            </div>
        );
    }
    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>Mehraneh where are you</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}