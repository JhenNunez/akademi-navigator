
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { goToScreen } from '../redux/slices/uiSlice';
import { setAuthenticated } from '../redux/slices/userSlice';
import Button from '../components/Button';
import AnimalIcon from '../components/AnimalIcon';
import ErrorMessage from '../components/ErrorMessage';
import { validatePattern } from '../utils/validators';

// Animal icons for pattern selection
const animalOptions = [
  { id: 'lion', name: 'León', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616412.png' },
  { id: 'elephant', name: 'Elefante', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616441.png' },
  { id: 'penguin', name: 'Pingüino', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616439.png' },
  { id: 'giraffe', name: 'Jirafa', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616433.png' },
  { id: 'monkey', name: 'Mono', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616434.png' },
  { id: 'tiger', name: 'Tigre', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616521.png' },
  { id: 'zebra', name: 'Cebra', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616440.png' },
  { id: 'bear', name: 'Oso', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616462.png' },
  { id: 'dolphin', name: 'Delfín', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616449.png' },
  { id: 'turtle', name: 'Tortuga', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616445.png' },
  { id: 'whale', name: 'Ballena', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616460.png' },
  { id: 'seal', name: 'Foca', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616453.png' },
  { id: 'fox', name: 'Zorro', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616452.png' },
  { id: 'raccoon', name: 'Mapache', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616554.png' },
  { id: 'owl', name: 'Búho', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616523.png' },
  { id: 'wolf', name: 'Lobo', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616520.png' },
  { id: 'cat', name: 'Gato', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616430.png' },
  { id: 'dog', name: 'Perro', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
  { id: 'rabbit', name: 'Conejo', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616457.png' },
  { id: 'hamster', name: 'Hámster', imageUrl: 'https://cdn-icons-png.flaticon.com/512/616/616464.png' }
];

const PatternScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedStudent = useAppSelector(state => state.user.selectedStudent);
  const [selectedPattern, setSelectedPattern] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Pattern validation
  const maxPatternLength = 4;
  
  useEffect(() => {
    if (!selectedStudent) {
      dispatch(goToScreen('UserSelection'));
    }
  }, [selectedStudent, dispatch]);
  
  if (!selectedStudent) return null;
  
  const handleSelectAnimal = (animalId: string) => {
    if (selectedPattern.length >= maxPatternLength || success) return;
    
    setSelectedPattern(prev => [...prev, animalId]);
    
    // Clear any existing errors
    if (error) setError(null);
  };
  
  const handleSubmit = () => {
    if (selectedPattern.length < maxPatternLength) {
      setError(`Selecciona ${maxPatternLength} animalitos para completar tu patrón`);
      return;
    }
    
    // Validate pattern against the correct one
    if (validatePattern(selectedPattern, selectedStudent.pattern)) {
      setSuccess(true);
      setError(null);
      
      // Delay for visual feedback before navigating
      setTimeout(() => {
        dispatch(setAuthenticated(true));
        dispatch(goToScreen('Home'));
      }, 1000);
    } else {
      setError('Patrón incorrecto. Inténtalo nuevamente.');
      setSelectedPattern([]);
    }
  };
  
  const handleReset = () => {
    setSelectedPattern([]);
    setError(null);
  };
  
  const handleGoBack = () => {
    dispatch(goToScreen('UserSelection'));
  };

  return (
    <div className="akademi-container">
      <div className="akademi-card">
        <h1 className="akademi-title">Tu patrón secreto</h1>
        <p className="akademi-subtitle">
          Hola {selectedStudent.name}, selecciona tus {maxPatternLength} animalitos en el orden correcto
        </p>

        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)}
          />
        )}

        {/* Selected pattern display */}
        <div className="flex justify-center space-x-2 my-4 h-20">
          {Array.from({ length: maxPatternLength }).map((_, index) => (
            <div 
              key={index} 
              className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
            >
              {selectedPattern[index] && (
                <img 
                  src={animalOptions.find(a => a.id === selectedPattern[index])?.imageUrl} 
                  alt={selectedPattern[index]} 
                  className="w-12 h-12 object-contain"
                />
              )}
            </div>
          ))}
        </div>

        {/* Animal grid */}
        <div className="grid grid-cols-4 gap-2 my-6">
          {animalOptions.map(animal => (
            <AnimalIcon
              key={animal.id}
              name={animal.name}
              imageUrl={animal.imageUrl}
              onClick={() => handleSelectAnimal(animal.id)}
              size="sm"
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleSubmit}
            fullWidth
            className={success ? "bg-akademi-green" : ""}
          >
            {success ? "¡Patrón correcto!" : "Verificar"}
          </Button>
          
          {!success && (
            <>
              <Button 
                onClick={handleReset}
                variant="secondary"
                fullWidth
              >
                Reiniciar
              </Button>
              <Button 
                onClick={handleGoBack}
                variant="secondary"
                fullWidth
              >
                Volver
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternScreen;
