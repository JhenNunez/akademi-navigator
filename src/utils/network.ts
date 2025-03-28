
// Check if browser is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const listenToNetworkChanges = (
  onOnline: () => void,
  onOffline: () => void
): () => void => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  // Return a cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};
