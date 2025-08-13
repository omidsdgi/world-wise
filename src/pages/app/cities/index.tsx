import {CityList} from "@/components";
import {CityType} from "@/type/CityType";

interface CitiesPageProps {
    cities: CityType[];
    isLoading: boolean;
}

export default function CitiesPage({ cities, isLoading }: CitiesPageProps) {
    return <CityList cities={cities} isLoading={isLoading} />;
}

// شبیه getServerSideProps یا getStaticProps برای لود داده
export async function getServerSideProps() {
    const res = await fetch('http://localhost:8000/cities');
    const cities = await res.json();
    return { props: { cities, isLoading: false } };
}