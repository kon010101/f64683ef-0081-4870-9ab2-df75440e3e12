export function formatDate(dateString) {
  const date = new Date(dateString);

  return `${date.toLocaleDateString()}`;
}

export function formatTime(dateString) {
  const date = new Date(dateString);

  return `${date.toLocaleTimeString()}`;
}
