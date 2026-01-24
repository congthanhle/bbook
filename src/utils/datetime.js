export const isNowAfterDate = (date) => {
  const targetDate = new Date(date).getTime();
  const now = new Date().getTime();
  return now > targetDate;
};

export const isNowBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  return now >= start && now <= end;
};

export const getFormattedDate = (date = new Date()) => {
  const days = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];
  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${dayName}, ${day}/${month}/${year}`;
};