export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString();
}

export function formatTime(dateString) {
  const date = new Date(dateString);

  return date.toLocaleTimeString();
}

export function formatTitleDate(dateString) {
  const date = new Date(dateString);

  const monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayStrings = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return `${dayStrings[date.getDay()]} ${monthStrings[date.getMonth()]} ${[
    date.getDate(),
  ]} ${date.getFullYear()}`;
}
