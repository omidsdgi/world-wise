"use client";

import { useMapEvents } from "react-leaflet";
import { useRouter } from "next/router";
import type { FC } from "react";

export const DetectClick: FC = () => {
    const router = useRouter();

    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;

            void router.push({
                pathname: "/app/form",
                query: { lat, lng },
            });
        },
    });

    return null;
};
