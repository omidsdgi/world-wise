import React, {useMemo} from "react";
import styles from './CityDetails.module.css';
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import { useRouter } from "next/router";
import {CityType} from "@/type/CityType";
import {useLayout} from "@/contexts/LayoutContext";
import {router} from "next/client";
import Button from "@/components/Button";

interface CityDetailsProps {
    city: CityType;
    isLoading: boolean;
}

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));

export function CityDetails() {
    const { cities, isLoading } = useLayout();
    const router = useRouter();
    const { id } = router.query;

    const city = cities.find((c) => c.id.toString() === id?.toString());

    if (isLoading) return <Spinner />;
    if (!city) return <Message message="City not found" />;

    const handleBack = () => {
        router.push("/app/cities");
    };

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{city.emoji}</span> {city.cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {city.cityName} on</h6>
                <p>{formatDate(city.date)}</p>
            </div>

            {city.notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{city.notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${city.cityName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Check out {city.cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <Button type="back"  onClick={handleBack}>
                    &larr; Back
                </Button>
            </div>
        </div>
    );
}