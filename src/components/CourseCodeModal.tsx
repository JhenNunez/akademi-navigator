
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { closeModal, setError, setLoading, goToScreen } from '../redux/slices/uiSlice';
import { setCourseCode, setCourseData } from '../redux/slices/courseSlice';
import Button from './Button';
import Modal from './Modal';
import ErrorMessage from './ErrorMessage';
import { fetchSchoolData } from '../services/schoolService';

const CourseCodeModal: React.FC = () => {
  const [code, setCode] = useState('');
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.ui.showCourseCodeModal);
  const isLoading = useAppSelector(state => state.ui.loading);
  const errorMessage = useAppSelector(state => state.ui.errorMessage);
  const isOnline = useAppSelector(state => state.network.isOnline);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      dispatch(setError('Por favor ingresa un código de curso'));
      return;
    }

    if (!isOnline) {
      dispatch(setError('Necesitas conexión a internet para validar el código'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const courseData = await fetchSchoolData(code);
      dispatch(setCourseCode(code));
      dispatch(setCourseData(courseData));
      dispatch(closeModal());
      dispatch(goToScreen('UserSelection'));
    } catch (error) {
      console.error('Error fetching school data:', error);
      dispatch(setError('Código de curso inválido. Por favor intenta nuevamente.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(closeModal());
        dispatch(setError(null));
      }}
      title="Código de curso"
    >
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <ErrorMessage 
            message={errorMessage} 
            onDismiss={() => dispatch(setError(null))}
          />
        )}
        
        <div className="mb-6">
          <label htmlFor="courseCode" className="block text-gray-700 mb-2">
            Ingresa el código de tu curso:
          </label>
          <input
            id="courseCode"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="akademi-input"
            placeholder="Ej: AKD-123456"
            autoComplete="off"
          />
        </div>
        
        <div className="flex space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              dispatch(closeModal());
              dispatch(setError(null));
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Validar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseCodeModal;
