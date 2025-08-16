import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export function useUrlPosition() {
    const router = useRouter();
    const { lat, lng } = router.query;

    const [position, setPosition] = useState<[number, number] | null>(() => {
        if (lat && lng) return [parseFloat(lat as string), parseFloat(lng as string)];
        return null; //
    });

    useEffect(() => {
        if (lat && lng) {
            setPosition([parseFloat(lat as string), parseFloat(lng as string)]);
        }
    }, [lat, lng]);

    return {lat,lng};
}