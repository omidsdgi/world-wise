import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Map.module.css";
import {useCities} from "@/contexts/LayoutContext";
import {useGeolocation} from "@/hooks/useGeolocation";
import Button from "@/components/Button";


// ✅ فقط روی کلاینت لود میشه
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });
const ChangeCenter = dynamic(() => import("./ChangeCenterMap").then(m => m.ChangeCenter), { ssr: false });
const DetectClick = dynamic(() => import("./DetectClick").then(m => m.DetectClick), { ssr: false });


export function MapComponent() {
    const {cities} = useCities();
    const router = useRouter();
    const {lat, lng} = router.query as { lat?: string; lng?: string };

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const {isLoading: isLoadingPosition, position: geolocationPosition, error, getPosition} = useGeolocation()
    const [hasClickedOnMap, setHasClickedOnMap] = useState(false);

    const [mapPosition, setMapPosition] = useState<[number, number]>(() => {
        if (lat && lng) return [parseFloat(lat), parseFloat(lng)];
        return [35.6892, 51.3890];
    });

    useEffect(()=>{
        if(geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        }
    },[geolocationPosition])

    useEffect(() => {
        if (lat && lng) {
            setMapPosition([parseFloat(lat), parseFloat(lng)]);
        }
    }, [lat, lng]);

    if (!isMounted) {
        return <div className={styles.mapContainer}>Loading Map...</div>;
    }

    return (
        <div className={styles.mapContainer}>
            {!hasClickedOnMap && (
                <Button type="position" onClick={getPosition}>
                    Use your position
                </Button>
            )}

            {isLoadingPosition && (
                <Button type="position" disabled>
                    Loading Position...
                </Button>
            )}

            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick onMapClick={() => setHasClickedOnMap(true)}/>
            </MapContainer>
        </div>
    );
}