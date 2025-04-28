import { useEffect } from 'react';
import { useLoadingStore } from '@/store/loading';
import { useLocation, useNavigationType } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

export const LoadingProvider = ({ children }: Props) => {
  const { setLoading } = useLoadingStore();
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // задержка чтобы показать лоадер

    return () => clearTimeout(timer);
  }, [location, navigationType]);

  return <>{children}</>;
};
