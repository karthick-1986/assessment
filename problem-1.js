function minStepsToMakePasswordStrong(password) {
    const n = password.length;
    let hasLowercase = false;
    let hasUppercase = false;
    let hasDigit = false;
    let hasRepeat = false;

    for (let i = 0; i < n; i++) {
      const c = password[i];
      if (c >= 'a' && c <= 'z') {
        hasLowercase = true;
      } else if (c >= 'A' && c <= 'Z') {
        hasUppercase = true;
      } else if (c >= '0' && c <= '9') {
        hasDigit = true;
      }
      if (i >= 2 && password[i] === password[i-1] && password[i-1] === password[i-2]) {
        hasRepeat = true;
      }
    }
  
    let missing = 0;
    if (!hasLowercase) {
      missing++;
    }
    if (!hasUppercase) {
      missing++;
    }
    if (!hasDigit) {
      missing++;
    }
    if (n < 6) {
      missing = Math.max(missing, 6 - n);
    } else if (n > 20) {
      missing = Math.max(missing, n - 20);
    }
    if (hasRepeat) {
      missing++;
    }
  
    return missing;
  }


//   1. A password is considered strong if the below conditions
// are all met:
// ● It has at least 6 characters and at most 20 characters.
// ● It contains at least one lowercase letter, at least one
// uppercase letter, and at least one digit.
// ● It does not contain three repeating characters in a row
// (i.e., &quot;Baaabb0&quot; is weak, but &quot;Baaba0&quot; is strong).