export function tripLengthCalc(start, end) {
  const diffDays = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return diffDays;
}
