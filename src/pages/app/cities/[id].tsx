
import {CityDetails} from "@/components/CityDetails";
import countryItem from "@/components/CountryItem";
import {CityType} from "@/type/CityType";
import {GetServerSideProps, GetServerSidePropsContext} from "next";

type CityDetailsPageProps = {
    city: CityType | null;
    isLoading: boolean;
};


export default function CityDetailsPage() {
    return <CityDetails />;
}

export const getServerSideProps: GetServerSideProps<CityDetailsPageProps> = async (
    context: GetServerSidePropsContext
) => {
    const { params } = context;

    const res = await fetch(`http://localhost:8000/cities/${params?.id}`);
    const city = res.ok ? await res.json() : null;

    return {
        props: { city, isLoading: false },
    };
}