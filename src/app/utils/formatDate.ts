export function formatDateToMMDDYYYY(isoDateString: string) {
  const date = new Date(isoDateString);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  return formattedDate;
}
