export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPercent(value, target) {
  const percent = value / target;
  return (percent * 100).toFixed(0);
}

export function formatDate(date) {
  const nextDate = date ? new Date(date) : new Date();

  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const day = String(nextDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 获取指定长度的过去日期
 * @param {number} days
 * @returns
 */
export function getYearDatesUntilToday(days) {
  const len = days - 1;
  const now = new Date();
  const firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - len);

  const dates = [];

  while (firstDate <= now) {
    dates.push(formatDate(firstDate));
    firstDate.setDate(firstDate.getDate() + 1);
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

export const getLevelClassNew = (value, target) => {
  const ratio = value / target;

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

export function isLogged() {
  const token = localStorage.getItem('token');
  // TODO: 接入token后，需要去掉username
  const username = localStorage.getItem('username');

  return token && username;
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 传入指定范围，得到范围内的随机数
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {number}
 */
export function getRandomInRange(minValue, maxValue) {
  return minValue + (maxValue - minValue) * Math.random();
}