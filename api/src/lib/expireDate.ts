export function expireDate(d: number) {
  const expDuration = d * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + expDuration);
}
