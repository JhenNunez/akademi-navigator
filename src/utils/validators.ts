
// Validate birth date
export const validateBirthDate = (date: string): boolean => {
  // Check if it's a valid date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return false;
  
  // Check if it's not in the future
  const today = new Date();
  if (parsedDate > today) return false;
  
  // Check if the child is between 3 and 12 years old
  const age = calculateAge(parsedDate);
  return age >= 3 && age <= 12;
};

// Calculate age based on birth date
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Validate course code format
export const validateCourseCode = (code: string): boolean => {
  // Course codes should be in the format "AKD-123456"
  const regex = /^[A-Za-z]{3}-\d{6}$/;
  return regex.test(code);
};

// Validate pattern
export const validatePattern = (input: string[], correct: string[]): boolean => {
  if (input.length !== correct.length) return false;
  
  return input.every((animal, index) => animal === correct[index]);
};
