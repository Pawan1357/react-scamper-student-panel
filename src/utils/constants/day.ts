import dayjs from 'dayjs';

export const formatDate = (date: string | Date, format = 'MM/DD/YY HH:mm') => {
  if (!date) return '-';
  return dayjs(date).format(format);
};
