import { RoutesPage } from "./Routes";
import { Loader } from "./shared/ui/Loader";
import { Header } from "./shared/ui/Header";
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Loader />
        <Header />
        <RoutesPage />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#1f2937',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontSize: '14px',
            },
          }}
        />
      </div>
    </div>
  );
};
