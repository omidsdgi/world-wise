import dynamic from 'next/dynamic';
import {CitiesProvider} from "@/contexts/LayoutContext";
import styles from './AppLayout.module.css';
import {Sidebar} from "@/components";

// MapComponent رو فقط سمت کلاینت لود کن
const MapComponent  = dynamic(() => import('@/components/Map').then(m => ({ default: m.MapComponent })), {
    ssr: false,
    loading: () => <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-dark--2)',
        color: 'var(--color-light--2)'
    }}>
        Loading Map...
    </div>
});


export function AppLayout() {
    return (
        <CitiesProvider>
            <div className={styles.app}>
                <Sidebar />
                <MapComponent  />
            </div>
        </CitiesProvider>
    );
}
