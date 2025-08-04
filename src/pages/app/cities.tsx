// pages/app/cities.tsx
const cities = [
    {
        cityName: "Lisbon",
        country: "Portugal",
        emoji: "🇵🇹",
        date: "2027-10-31T15:59:59.138Z",
        notes: "My favorite city so far!",
        position: {
            lat: 38.727881642324164,
            lng: -9.140900099907554
        },
        id: 73930385
    },
    {
        cityName: "Madrid",
        country: "Spain",
        emoji: "🇪🇸",
        date: "2027-07-15T08:22:53.976Z",
        notes: "",
        position: {
            lat: 40.46635901755316,
            lng: -3.7133789062500004
        },
        id: 17806751
    },
    {
        cityName: "Berlin",
        country: "Germany",
        emoji: "🇩🇪",
        date: "2027-02-12T09:24:11.863Z",
        notes: "Amazing 😃",
        position: {
            lat: 52.53586782505711,
            lng: 13.376933665713324
        },
        id: 98443197
    }
]

export default function Cities() {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Cities </h2>
            <div style={{ display: 'grid', gap: '15px' }}>
                {cities.map((city) => (
                    <div key={city.id} style={{
                        padding: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            marginBottom: '8px'
                        }}>
                            {city.emoji} {city.cityName}
                        </div>
                        <div style={{
                            color: '#666',
                            marginBottom: '5px'
                        }}>
                            Country: {city.country}
                        </div>
                        <div style={{
                            color: '#666',
                            fontSize: '14px',
                            marginBottom: '5px'
                        }}>
                            Date: {new Date(city.date).toLocaleDateString()}
                        </div>
                        {city.notes && (
                            <div style={{
                                fontStyle: 'italic',
                                color: '#888',
                                fontSize: '14px'
                            }}>
                                Notes: {city.notes}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}