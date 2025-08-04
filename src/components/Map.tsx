import styles from './Map.module.css'

export function Map() {
    return (
        <div className={styles.mapContainer}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'column',
                backgroundColor: '#e8f4f8',
                backgroundImage: 'linear-gradient(45deg, #e8f4f8 25%, #f0f8ff 25%, #f0f8ff 50%, #e8f4f8 50%, #e8f4f8 75%, #f0f8ff 75%, #f0f8ff)',
                backgroundSize: '20px 20px'
            }}>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '40px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        color: '#2c3e50',
                        marginBottom: '20px',
                        fontSize: '2.5em'
                    }}>
                        🗺️ World Map
                    </h2>
                    <p style={{
                        color: '#7f8c8d',
                        textAlign: 'center',
                        maxWidth: '400px',
                        fontSize: '1.1em',
                        lineHeight: '1.6'
                    }}>
                        Explore your travel destinations! Select Cities or Countries from the sidebar to view your journey details.
                    </p>
                    <div style={{
                        marginTop: '30px',
                        fontSize: '4em'
                    }}>
                        🌍
                    </div>
                </div>
            </div>
        </div>
    );
}