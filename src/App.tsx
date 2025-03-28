
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { setOnlineStatus } from './redux/slices/networkSlice';

// Screens
import SplashScreen from './screens/SplashScreen';
import AgeScreen from './screens/AgeScreen';
import LoginScreen from './screens/LoginScreen';
import UserSelectionScreen from './screens/UserSelectionScreen';
import PatternScreen from './screens/PatternScreen';
import HomeScreen from './screens/HomeScreen';

// Components
import CourseCodeModal from './components/CourseCodeModal';
import OfflineBanner from './components/OfflineBanner';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const showModal = useAppSelector((state) => state.ui.showCourseCodeModal);
  const errorMessage = useAppSelector((state) => state.ui.errorMessage);
  const isLoading = useAppSelector((state) => state.ui.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set initial online status
    dispatch(setOnlineStatus(navigator.onLine));

    // Event listeners for online/offline status
    window.addEventListener('online', () => dispatch(setOnlineStatus(true)));
    window.addEventListener('offline', () => dispatch(setOnlineStatus(false)));

    return () => {
      window.removeEventListener('online', () => dispatch(setOnlineStatus(true)));
      window.removeEventListener('offline', () => dispatch(setOnlineStatus(false)));
    };
  }, [dispatch]);

  // Render the appropriate screen based on the currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'Age':
        return <AgeScreen />;
      case 'Login':
        return <LoginScreen />;
      case 'UserSelection':
        return <UserSelectionScreen />;
      case 'Pattern':
        return <PatternScreen />;
      case 'Home':
        return <HomeScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main screen content */}
      {renderScreen()}

      {/* Course code modal */}
      {showModal && <CourseCodeModal />}

      {/* Global error message */}
      {errorMessage && !showModal && (
        <div className="fixed top-4 left-0 right-0 px-4 z-50">
          <ErrorMessage message={errorMessage} />
        </div>
      )}

      {/* Offline banner */}
      <OfflineBanner />

      {/* Global loading indicator */}
      {isLoading && !showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <LoadingSpinner size="lg" color="white" />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
