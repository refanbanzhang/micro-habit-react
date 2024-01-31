export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPercent(value, target) {
  const percent = value / target;
  return (percent * 100).toFixed(2);
}

export function formatDate(date) {
  const nextDate = date ? new Date(date) : new Date();

  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const day = String(nextDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getYearDatesUntilToday(date) {
  const today = date ? new Date(date) : new Date();
  const firstDayOfYear = new Date(today.setFullYear(today.getFullYear() - 1));
  const now = new Date();

  const dates = [];

  while (firstDayOfYear <= now) {
    dates.push(formatDate(firstDayOfYear));
    firstDayOfYear.setDate(firstDayOfYear.getDate() + 1);
  }

  return dates.map((date) => ({ date }));
}

export const getLevelClass = (value, target, allFinished) => {
  const ratio = value / target;

  if (!allFinished) {
    return '';
  }
  if (!target) {
    return '';
  }
  if (ratio < 1) {
    return '';
  }
  if (ratio === 1) {
    return 'l1-bg';
  }
  if (ratio <= 5) {
    return 'l2-bg';
  }
  if (ratio <= 10) {
    return 'l3-bg';
  }
  return 'l4-bg';
};

export function logout() {
  localStorage.removeItem('token');
  // TODO: 接入token后，需要去掉username
  localStorage.removeItem('username');
}