export function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}-${month}-${day}`;
}

export function getPercent(value, target) {
  const percent = value / target;
  return (percent * 100).toFixed(2);
}
