
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { goToScreen } from '../redux/slices/uiSlice';
import { setSelectedStudent } from '../redux/slices/userSlice';
import Button from '../components/Button';
import AvatarIcon from '../components/AvatarIcon';
import ErrorMessage from '../components/ErrorMessage';
import { Student } from '../models/Student';

const UserSelectionScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const course = useAppSelector(state => state.course.currentCourse);
  const [selectedUser, setSelectedUser] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!course) {
    // This shouldn't happen, but just in case
    setTimeout(() => dispatch(goToScreen('Login')), 100);
    return null;
  }

  const handleSelectUser = (student: Student) => {
    setSelectedUser(student);
    if (error) setError(null);
  };

  const handleContinue = () => {
    if (!selectedUser) {
      setError('Por favor selecciona un estudiante para continuar');
      return;
    }

    dispatch(setSelectedStudent(selectedUser));
    dispatch(goToScreen('Pattern'));
  };

  const handleGoBack = () => {
    dispatch(goToScreen('Login'));
  };

  return (
    <div className="akademi-container">
      <div className="akademi-card">
        <h1 className="akademi-title">¿Quién eres?</h1>
        <p className="akademi-subtitle">
          Selecciona tu perfil de {course.school} - {course.name}
        </p>

        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)}
          />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
          {course.students.map(student => (
            <AvatarIcon
              key={student.id}
              name={student.name}
              avatarUrl={student.avatarUrl}
              isSelected={selectedUser?.id === student.id}
              onClick={() => handleSelectUser(student)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleContinue}
            fullWidth
          >
            Continuar
          </Button>
          <Button 
            onClick={handleGoBack}
            variant="secondary"
            fullWidth
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionScreen;
