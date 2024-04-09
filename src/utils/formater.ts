export function convertToISO8601(dateString: string): string | null {
  const parsedDate = new Date(dateString);

  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  const iso8601Date = parsedDate.toISOString();
  return iso8601Date;
}

const json = (param: any): any => {
  return JSON.stringify(
    param,
    (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
  );
};
export default json;
