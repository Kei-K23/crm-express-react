export function passwordValidation(value: string) {
  return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
}
