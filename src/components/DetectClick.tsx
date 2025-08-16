"use client";

import { useMapEvents } from "react-leaflet";
import { useRouter } from "next/router";
import type { FC } from "react";
interface DetectClickProps {
    onMapClick?: () => void;
}
export const DetectClick: FC<DetectClickProps> = ({ onMapClick }) => {
    const router = useRouter();
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            if (onMapClick) {
                onMapClick();
            }
            void router.push({
                pathname: "/app/form",
                query: { lat, lng },
            });
        },
    });

    return null;
};
