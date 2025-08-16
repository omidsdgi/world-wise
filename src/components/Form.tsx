// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import React, {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import {useUrlPosition} from "@/hooks/useUrlPosition";
import * as console from "node:console";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function Form() {
    const { lat, lng } = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
    const [cityName, setCityName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [date, setDate] = useState <string>("new Date()");
    const [notes, setNotes] = useState<string>("");
    const [emoji, setEmoji] = useState("")

    const router = useRouter();
    const handleBack = () => {
        // void router.push("/app/cities"); // یا مسیر قبلی دلخواه
        router.back();
    };

    useEffect( ()=>{
        if (!lat ||!lng) return;
        async function fetchCityData(){
            try{
                setIsLoadingGeocoding(true)
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();

                setCityName(data.city.name || data.locality ||null);
                setCountry(data.countryName ||"");
                setEmoji(convertToEmoji(data.countryCode));
            }
            catch (err){

            }
            finally {
                setIsLoadingGeocoding(false)
            }
        }
            fetchCityData()
    },[lat,lng])

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                 <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button
                    type="back"
                    onClick={(e)=>{
                        e.preventDefault();
                        handleBack()
                    }}>
                    &larr; Back
                </Button>
            </div>
        </form>
    );
}

