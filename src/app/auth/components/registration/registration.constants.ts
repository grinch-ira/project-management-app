export const config = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 20,
  PATTERN_NAME: /^[a-z0-9]+$/,
  PATTERN_PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};
