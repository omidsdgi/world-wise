// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import React, {useEffect, useState} from "react";
import styles from "./Form.module.css";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import {useUrlPosition} from "@/hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {useCities} from "@/contexts/LayoutContext";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode:string):string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}


export function Form() {
    const {createCity,isLoading}=useCities()
    const { lat, lng } = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
    const [cityName, setCityName] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [date, setDate] = useState<Date >(new Date());
    const [notes, setNotes] = useState<string>("");
    const [emoji, setEmoji] = useState("")

    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    useEffect( ()=>{
        if (!lat ||!lng) return;

        async function fetchCityData(){
                setIsLoadingGeocoding(true)
            try{
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data)
                setCityName(data.city || data.locality ||null);
                setCountry(data.countryName ||"");
                setEmoji(data.countryCode ?convertToEmoji(data.countryCode):"");
            }
            catch (err){
                console.error("Failed to fetch city data:", err);
            }
            finally {
                setIsLoadingGeocoding(false)
            }
        }
            fetchCityData()
    },[lat,lng])
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!lat || !lng) return;
      const newCity = {
         cityName,
          country,
          emoji,
          date,
          notes,
          position:{lat,lng}
      }
  await createCity(newCity)
    router.push("/app/cities")
}
    return (
        <form className={`${styles.form} ${isLoading ? styles.loading:""}`} onSubmit={handleSubmit}>
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
            <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="Select a date"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
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

