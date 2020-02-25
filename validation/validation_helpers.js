const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
};

const hasSpecialChar = str => {
  const specialChars = ['@', '%', '+', '!', '#', '$', '^', '?', ':', ',', '(', ')', '[', ']', '~', '-', '_', '.']

  for (let i = 0; i < str.length; i++){
    if (specialChars.includes(str[i])) return true;
  }

  return false;
}

const hasNumber = str => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

  for (let i = 0; i < str.length; i++){
    if (numbers.includes(str[i])) return true;
  }

  return false;
}

const hasCapital = str => {
  const caps = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  for (let i = 0; i < str.length; i++){
    if (caps.includes(str[i])) return true;
  }

  return false;
}

module.exports = { validText, hasSpecialChar, hasNumber, hasCapital };
