
import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { goToScreen } from '../redux/slices/uiSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const SplashScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate loading time then navigate to age screen
    const timer = setTimeout(() => {
      dispatch(goToScreen('Age'));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="akademi-container bg-akademi-blue bg-opacity-10">
      <div className="flex flex-col items-center justify-center animate-fade-in">
        <div className="w-48 h-48 mb-6">
          <img
            src="https://img.icons8.com/color/480/null/graduation-cap.png"
            alt="AkademiApp Logo"
            className="w-full h-full object-contain animate-bounce-in"
          />
        </div>
        <h1 className="text-4xl font-bold text-akademi-purple mb-2">AkademiApp</h1>
        <p className="text-akademi-text-light text-xl mb-8">Tu compañero de aprendizaje</p>
        <LoadingSpinner size="md" />
      </div>
    </div>
  );
};

export default SplashScreen;
