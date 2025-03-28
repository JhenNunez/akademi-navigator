
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setOnlineStatus } from '../redux/slices/networkSlice';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

const OfflineBanner: React.FC = () => {
  const isOnline = useAppSelector(state => state.network.isOnline);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial check
    dispatch(setOnlineStatus(navigator.onLine));

    // Add event listeners
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  if (isOnline) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-red-500 text-white py-2 px-4",
      "flex items-center justify-center text-sm font-medium z-50",
      "animate-bounce-in"
    )}>
      <WifiOff size={18} className="mr-2" />
      Sin conexión - Trabajando en modo offline
    </div>
  );
};

export default OfflineBanner;
