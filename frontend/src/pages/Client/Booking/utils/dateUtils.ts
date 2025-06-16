export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getWeekDates = (startDate: Date): Date[] => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

export const getMonthDates = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (currentDate >= today) {
      dates.push(currentDate);
    }
  }
  
  return dates;
};

export const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(result.setDate(diff));
};

export const getQuickSelectDates = (type: string): Date[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  switch (type) {
    case 'today':
      return [today];
    
    case 'tomorrow':
      return [addDays(today, 1)];
    
    case 'thisWeek':
      const startOfThisWeek = getStartOfWeek(today);
      return getWeekDates(startOfThisWeek).filter(date => date >= today);
    
    case 'nextWeek':
      const startOfNextWeek = addDays(getStartOfWeek(today), 7);
      return getWeekDates(startOfNextWeek);
    
    case 'thisMonth':
      return getMonthDates(today);
    
    case 'nextMonth':
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      return getMonthDates(nextMonth);
    
    default:
      return [];
  }
};