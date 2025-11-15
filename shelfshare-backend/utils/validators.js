function isValidEmail(email) {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

function isStrongPassword(password) {
  if (!password) return false;
  return password.length >= 6;
}

module.exports = { isValidEmail, isStrongPassword };
