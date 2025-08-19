
import React, {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import {useUrlPosition} from "@/hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {useCities} from "@/contexts/LayoutContext";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export function Form() {
    const { createCity, isLoading } = useCities();
    const { lat, lng } = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState<string>("");
    const [emoji, setEmoji] = useState<string>("");
    const [geocodingError, setGeocodingError] = useState<string>("");

    const router = useRouter();

    const handleBack = ():void => {
        router.back();
    };

    useEffect(() => {
        if (!lat || !lng) return;

        async function fetchCityData():Promise<void> {
            setIsLoadingGeocoding(true);
            setGeocodingError("");
            try {
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

                if (!res.ok) {
                    setGeocodingError(`HTTP error! status: ${res.status}`);
                    return
                }
                const data = await res.json();

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                setEmoji(data.countryCode ? convertToEmoji(data.countryCode) : "");
            } catch (err) {
                console.error("Failed to fetch city data:", err);
                const errorMessage = err instanceof Error ? err.message : "Failed to fetch location data. Please try again.";
                setGeocodingError(errorMessage);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData().catch((error) => {
            console.error("Unexpected error in fetchCityData:", error);
            setGeocodingError("An unexpected error occurred. Please try again.");
            setIsLoadingGeocoding(false);
        });
    }, [lat, lng]);

        async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();

            if (!lat || !lng) {
                alert("Please select a location on the map first.");
                return;
            }
            if (!cityName.trim()) {
                alert("Please enter a city name.");
                return;
            }
            if (!date) {
                alert("Please select a date.");
                return;
            }

            const newCity = {
                cityName: cityName.trim(),
                country,
                emoji,
                date,
                notes: notes.trim(),
                position: { lat: Number(lat), lng: Number(lng) }
            };

            try {
                await createCity(newCity);
                await router.push("/app/cities");
            } catch (error) {
                console.error("Failed to create city:", error);
                const errorMessage = error instanceof Error ? error.message : "Failed to add city. Please try again.";
                alert(errorMessage);
            }   }

        if (!lat && !lng) {
            return (
                <div className={styles.form}>
                    <p>Start by clicking somewhere on the map</p>
                </div>
            );
        }

        return (
            <form
                className={`${styles.form} ${(isLoading || isLoadingGeocoding) ? styles.loading : ""}`}
                onSubmit={handleSubmit}
            >
                {geocodingError && (
                    <div className={styles.error}>
                        {geocodingError}
                    </div>
                )}

                <div className={styles.row}>
                    <label htmlFor="cityName">City name</label>
                    <input
                        id="cityName"
                        onChange={(e) => setCityName(e.target.value)}
                        value={cityName}
                        disabled={isLoadingGeocoding}
                        required
                    />
                    <span className={styles.flag}>{emoji}</span>
                </div>

                <div className={styles.row}>
                    <label htmlFor="date">When did you go to {cityName || "this place"}?</label>
                    <DatePicker
                        id="date"
                        selected={date}
                        onChange={(selectedDate: Date | null) => setDate(selectedDate)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select a date"
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        disabled={isLoadingGeocoding}
                        required
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="notes">Notes about your trip to {cityName || "this place"}</label>
                    <textarea
                        id="notes"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        disabled={isLoadingGeocoding}
                    />
                </div>

                <div className={styles.buttons}>
                    <Button
                        type="primary"
                       >
                        {isLoading ? "Adding..." : "Add"}
                    </Button>
                    <Button
                        type="back"
                        onClick={(e) => {
                            e.preventDefault();
                            handleBack();
                        }}
                    >
                        &larr; Back
                    </Button>
                </div>
            </form>
        );
    }