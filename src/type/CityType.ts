export interface CityType {
    id: number;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position:
        { lat: number;
            lng: number };
}