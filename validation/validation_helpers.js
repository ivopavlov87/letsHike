const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
};

const hasSpecialChar = str => {
  const specialChars = {
                        '@' : true,
                        '%' : true,
                        '+' : true,
                        '!' : true,
                        '#' : true,
                        '$' : true,
                        '^' : true,
                        '?' : true,
                        ':' : true,
                        ',' : true,
                        '(' : true,
                        ')' : true,
                        '[' : true,
                        ']' : true,
                        '~' : true,
                        '-' : true,
                        '.' : true
                      };

  for (let i = 0; i < str.length; i++){
    if (specialChars[str[i]]) return true;
  };

  return false;
}

const hasNumber = str => {
  const numbers = {
                    '0' : true,
                    '1' : true,
                    '2' : true,
                    '3' : true,
                    '4' : true,
                    '5' : true,
                    '6' : true,
                    '7' : true,
                    '8' : true,
                    '9' : true
                  }

  for (let i = 0; i < str.length; i++){
    if (numbers[str[i]]) return true;
  }

  return false;
}

const hasCapital = str => {
  const caps = {
                'A': true,
                'B': true,
                'C': true,
                'D': true,
                'E': true,
                'F': true,
                'G': true,
                'H': true,
                'I': true,
                'J': true,
                'K': true,
                'L': true,
                'M': true,
                'N': true,
                'O': true,
                'P': true,
                'Q': true,
                'R': true,
                'S': true,
                'T': true,
                'U': true,
                'V': true,
                'W': true,
                'X': true,
                'Y': true,
                'Z': true
              };

  for (let i = 0; i < str.length; i++){
    if (caps[str[i]]) return true;
  }

  return false;
}

module.exports = { validText, hasSpecialChar, hasNumber, hasCapital };
