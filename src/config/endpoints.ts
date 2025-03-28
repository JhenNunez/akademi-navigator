
// We'll use environment variables for production, but for now we'll use these defaults
const API_BASE_URL = 'https://api.akademiapp.com/api/v1';

export const ENDPOINTS = {
  VALIDATE_COURSE: `${API_BASE_URL}/courses/validate`,
};

// For our mock implementation, we'll just return a static response
export const MOCK_API = true;
