export function convertToISO8601(dateString: string): string | null {
  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  const iso8601Date = parsedDate.toISOString();
  return iso8601Date;
}
