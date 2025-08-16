import { useState } from "react";

type Position = { lat: number; lng: number } | null;

export function useGeolocation(defaultPosition: Position = null) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState<Position>(defaultPosition);
    const [error, setError] = useState<string | null>(null);

    function getPosition() {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported");
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (err) => {
                setError(err.message);
                setIsLoading(false);
            }
        );
    }

    return { isLoading, position, error, getPosition };
}
