export const REGEX = {
  BLANK_SPACE: /^(?!\s)(?!.*\s$)(?!\s+$).+/,
  EMAIL_STANDARD: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  PASSWORD_STRONG: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
  PHONE_NUMBER: /^\d{10}$/,
  LINK: /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/\S*)?$/
};
