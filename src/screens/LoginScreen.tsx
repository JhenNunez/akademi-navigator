
import React from 'react';
import { useAppDispatch } from '../redux/hooks';
import { goToScreen, openModal } from '../redux/slices/uiSlice';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSchoolLogin = () => {
    dispatch(openModal());
  };

  // These would be implemented with real authentication in the future
  const handleGoogleLogin = () => {
    alert('Inicio de sesión con Google no implementado aún');
  };

  const handleAppleLogin = () => {
    alert('Inicio de sesión con Apple no implementado aún');
  };

  return (
    <div className="akademi-container">
      <div className="akademi-card">
        <h1 className="akademi-title">Inicia sesión</h1>
        <p className="akademi-subtitle">Elige cómo quieres iniciar sesión</p>

        <div className="space-y-4 mt-6">
          <Button 
            onClick={handleGoogleLogin}
            fullWidth
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
              alt="Google logo" 
              className="w-5 h-5 mr-2"
            />
            Continuar con Google
          </Button>

          <Button 
            onClick={handleAppleLogin}
            fullWidth
            className="bg-black text-white hover:bg-gray-800"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
              <path d="M12 20.94c1.5 0 2.75-.67 3.83-1.5C16.78 18.5 17 17.5 17 16c0-1.37-.5-2.5-1.5-3.35-.96-.86-2.18-1.35-3.5-1.35-1.62 0-2.5.67-3.5 1.35C7.5 13.5 7 14.63 7 16c0 1.5.23 2.5 1.17 3.44 1.08.83 2.33 1.5 3.83 1.5zm5-14.4c-.15 1.82-1.58 3.28-3.3 3.28-1.63 0-3.3-1.35-3.7-3.28-.38 1.93-1.7 3.28-3.3 3.28-1.72 0-3.15-1.46-3.3-3.28.15-1.82 1.58-3.28 3.3-3.28 1.6 0 2.92 1.35 3.3 3.28.4-1.93 2.07-3.28 3.7-3.28 1.72 0 3.15 1.46 3.3 3.28z"/>
            </svg>
            Continuar con Apple
          </Button>

          <Button 
            onClick={handleSchoolLogin}
            fullWidth
            className="bg-akademi-purple"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Ingresar con mi colegio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
