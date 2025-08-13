
import {CityType} from "@/type/CityType";
import {CityDetails} from "@/components/CityDetails";


interface CityDetailsPageProps {
    city: CityType ;
    isLoading: boolean;
}

export default function CityDetailsPage({ city, isLoading }: CityDetailsPageProps) {
    return <CityDetails city={city} isLoading={isLoading} />;
}

export async function getServerSideProps({ params }:any) {
    const res = await fetch(`http://localhost:8000/api/cities/${params.id}`);
    const city = res.ok ? await res.json() : null;
    return { props: { city, isLoading: false } };
}
