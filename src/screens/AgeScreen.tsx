
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { goToScreen } from '../redux/slices/uiSlice';
import { setBirthDate } from '../redux/slices/userSlice';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import { validateBirthDate } from '../utils/validators';

const AgeScreen: React.FC = () => {
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      setError('Por favor ingresa tu fecha de nacimiento');
      return;
    }

    if (!validateBirthDate(date)) {
      setError('Fecha de nacimiento inválida. Debes tener entre 3 y 12 años.');
      return;
    }

    dispatch(setBirthDate(date));
    dispatch(goToScreen('Login'));
  };

  return (
    <div className="akademi-container">
      <div className="akademi-card">
        <h1 className="akademi-title">¡Bienvenido a AkademiApp!</h1>
        <p className="akademi-subtitle">Para comenzar, necesitamos saber tu fecha de nacimiento</p>

        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-6">
            <label htmlFor="birthdate" className="block text-gray-700 mb-2">
              Fecha de nacimiento:
            </label>
            <input
              id="birthdate"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="akademi-input"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <Button 
            type="submit" 
            fullWidth
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AgeScreen;
