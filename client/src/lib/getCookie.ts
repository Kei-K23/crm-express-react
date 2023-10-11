export function getCookie(n: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name === n) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
