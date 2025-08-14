import React from "react";
import styles from './CityDetails.module.css';
import Message from "@/components/Message";
import { useRouter } from "next/router";
import {useCities} from "@/contexts/LayoutContext";
import Button from "@/components/Button";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));

export function CityDetails() {
    const { currentCity,isLoading } = useCities();
    const router = useRouter();

    if (!currentCity) return <Message message="City not found" />;

    const handleBack = () => {
        router.push("/app/cities");
    };

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{currentCity.emoji}</span> {currentCity.cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {currentCity.cityName} on</h6>
                <p>{formatDate(currentCity.date)}</p>
            </div>

            {currentCity.notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{currentCity.notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Check out {currentCity.cityName} on Wikipedia &rarr;
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