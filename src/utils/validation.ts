export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateNumber = (value: number): boolean => {
  return !isNaN(value) && value >= 0;
};

export const validateDate = (date: string): boolean => {
  const selectedDate = new Date(date);
  const today = new Date();
  return selectedDate > today;
};