export const parseDate = date =>
  date
    .substring(0, 10)
    .split('-')
    .reverse()
    .join('/');
