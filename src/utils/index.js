export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return 'Chào buổi sáng ☀️';
  } else if (hour >= 11 && hour < 14) {
    return 'Chào buổi trưa 🍽️';
  } else if (hour >= 14 && hour < 18) {
    return 'Chào buổi chiều 🌤️';
  } else {
    return 'Chào buổi tối 🌙';
  }
};