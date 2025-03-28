
import { ENDPOINTS, MOCK_API } from '../config/endpoints';
import { Course } from '../models/Course';

// Mock data for offline development
const MOCK_COURSE_DATA: Course = {
  id: 'c123',
  code: 'AKD-123456',
  name: 'Primero Básico',
  school: 'Colegio San Francisco',
  students: [
    {
      id: 's1',
      name: 'María',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png',
      pattern: ['lion', 'elephant', 'penguin', 'giraffe']
    },
    {
      id: 's2',
      name: 'Carlos',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
      pattern: ['monkey', 'tiger', 'zebra', 'bear']
    },
    {
      id: 's3',
      name: 'Lucía',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
      pattern: ['dolphin', 'turtle', 'whale', 'seal']
    },
    {
      id: 's4',
      name: 'Santiago',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140046.png',
      pattern: ['fox', 'raccoon', 'owl', 'wolf']
    },
    {
      id: 's5',
      name: 'Valentina',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png',
      pattern: ['cat', 'dog', 'rabbit', 'hamster']
    },
    {
      id: 's6',
      name: 'Mateo',
      avatarUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140045.png',
      pattern: ['eagle', 'hawk', 'falcon', 'parrot']
    }
  ]
};

export const fetchSchoolData = async (code: string): Promise<Course> => {
  // If we're using mock data, return it after a delay to simulate network latency
  if (MOCK_API) {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validate mock code
    if (code.toLowerCase() !== 'akd-123456') {
      throw new Error('Invalid course code');
    }
    
    return MOCK_COURSE_DATA;
  }
  
  // Real API implementation for production
  try {
    const response = await fetch(`${ENDPOINTS.VALIDATE_COURSE}/${code}`);
    
    if (!response.ok) {
      throw new Error('Invalid course code');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching school data:', error);
    throw error;
  }
};
