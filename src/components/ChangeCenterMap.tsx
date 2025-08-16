import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function ChangeCenter({ position }: { position: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position);
    }, [map, position]);

    return null;
}
