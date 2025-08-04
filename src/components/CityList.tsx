import styles from './CityList.module.css'
import {useEffect, useState} from "react";
import Spinner from "@/components/Spinner";
import {CityItem} from "@/components/CityItem";
import Message from "@/components/Message";



export  function CityList({cities,isLoading}) {


    if (isLoading) return<Spinner />;
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>;

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (<CityItem key={city.cityName ||city.id}  city={city} />))}
        </ul>
    );
}