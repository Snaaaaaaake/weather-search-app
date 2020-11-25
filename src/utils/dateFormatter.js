function addZero(date) {
  return date < 10 ? `0${date}` : date;
}

export default function dateFormatter(rawDate) {
  return `${addZero(rawDate.getDate())}.${addZero(rawDate.getMonth() + 1)}.${rawDate.getFullYear()}`;
}
