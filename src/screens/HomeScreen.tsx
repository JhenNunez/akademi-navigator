
import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { goToScreen, setError } from '../redux/slices/uiSlice';
import { clearUserData } from '../redux/slices/userSlice';
import { LogOut, Book, Calendar, Bell, User } from 'lucide-react';
import Button from '../components/Button';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const student = useAppSelector(state => state.user.selectedStudent);
  const course = useAppSelector(state => state.course.currentCourse);
  
  if (!student || !course) {
    // Redirect if missing data
    dispatch(setError('Sesión no válida'));
    dispatch(goToScreen('Login'));
    return null;
  }
  
  const handleLogout = () => {
    dispatch(clearUserData());
    dispatch(goToScreen('Login'));
  };

  return (
    <div className="min-h-screen bg-akademi-background pb-20">
      {/* App Bar */}
      <header className="bg-akademi-purple text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white">
              <img 
                src={student.avatarUrl} 
                alt={student.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h1 className="text-lg font-medium">¡Hola, {student.name}!</h1>
              <p className="text-sm opacity-80">{course.school} - {course.name}</p>
            </div>
          </div>
          <Button 
            onClick={handleLogout}
            className="bg-opacity-20 hover:bg-opacity-30 py-2"
          >
            <LogOut size={18} />
            Salir
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <h2 className="akademi-title mb-4">Bienvenido a tu espacio de aprendizaje</h2>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-lg text-center mb-4">
              Este es el panel principal de AkademiApp donde podrás acceder a todas las actividades y recursos disponibles.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-akademi-blue bg-opacity-30 p-4 rounded-xl flex flex-col items-center text-center">
                <Book size={36} className="text-akademi-purple mb-2" />
                <h3 className="font-semibold">Mis Cursos</h3>
                <p className="text-sm text-gray-600">Accede a tus materias</p>
              </div>
              <div className="bg-akademi-orange bg-opacity-20 p-4 rounded-xl flex flex-col items-center text-center">
                <Calendar size={36} className="text-akademi-orange mb-2" />
                <h3 className="font-semibold">Calendario</h3>
                <p className="text-sm text-gray-600">Revisa tus actividades</p>
              </div>
              <div className="bg-akademi-green bg-opacity-20 p-4 rounded-xl flex flex-col items-center text-center">
                <Bell size={36} className="text-akademi-green mb-2" />
                <h3 className="font-semibold">Notificaciones</h3>
                <p className="text-sm text-gray-600">Mantente al día</p>
              </div>
              <div className="bg-akademi-pink bg-opacity-20 p-4 rounded-xl flex flex-col items-center text-center">
                <User size={36} className="text-akademi-pink mb-2" />
                <h3 className="font-semibold">Mi Perfil</h3>
                <p className="text-sm text-gray-600">Personaliza tu cuenta</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-akademi-text mb-4">Actividades recientes</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-akademi-purple flex items-center justify-center text-white mr-3">
                    <Book size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Actividad {item}</h3>
                    <p className="text-sm text-gray-500">Completada hace {item} día{item > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around">
          {[
            { icon: <Book size={24} />, label: 'Cursos' },
            { icon: <Calendar size={24} />, label: 'Calendario' },
            { icon: <Bell size={24} />, label: 'Alertas' },
            { icon: <User size={24} />, label: 'Perfil' }
          ].map((item, i) => (
            <button 
              key={i}
              className="py-3 px-5 flex flex-col items-center text-gray-600 hover:text-akademi-purple focus:text-akademi-purple"
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HomeScreen;
