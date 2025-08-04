// pages/app/countries.tsx

const countries = [
    {
        country: "Portugal",
        emoji: "🇵🇹",
        cities: ["Lisbon"],
        id: 1
    },
    {
        country: "Spain",
        emoji: "🇪🇸",
        cities: ["Madrid"],
        id: 2
    },
    {
        country: "Germany",
        emoji: "🇩🇪",
        cities: ["Berlin"],
        id: 3
    }
]

export default function Countries() {
    return (
        <div style={{ padding: '20px' }}>
    <h2>Countries</h2>
    <div style={{ display: 'grid', gap: '15px' }}>
    {countries.map((country) => (
        <div key={country.id} style={{
        padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f0f8ff'
    }}>
        <div style={{
        fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '8px'
    }}>
        {country.emoji} {country.country}
        </div>
        <div style={{
        color: '#666',
            fontSize: '14px'
    }}>
        Cities visited: {country.cities.join(', ')}
        </div>
        </div>
    ))}
    </div>
    </div>
);
}