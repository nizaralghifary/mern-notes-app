export const validateEmail = (email) => { 
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return '';
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials.toUpperCase();
};