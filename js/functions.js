// Функция для проверки длины строки.

const isLengthValid = (text, maxLength) => text.length <= maxLength;

isLengthValid("проверяемая строка", 20); // true
isLengthValid("проверяемая строка", 18); // true
isLengthValid("проверяемая строка", 10); // false

//Функция для проверки, является ли строка палиндромом.

const isPalindrome = (text) => {
  const normalizedText = text.replaceAll(" ", "").toLowerCase();

  let reversedText = "";
  for (let i = normalizedText.length - 1; i >= 0; i--) {
    reversedText += normalizedText[i];
  }

  return normalizedText === reversedText;
};

/* const isPalindrome = (text) => {
  const normalizedText = text.replaceAll(' ', '').toLowerCase();
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
  }; */

isPalindrome("топот"); // true
isPalindrome("ДовОд"); // true
isPalindrome("Кекс"); // false
isPalindrome("Лёша на полке клопа нашёл "); // true

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

const getNumberFromString = (text) => {
  if (typeof text === "number") {
    text = text.toString();
  }

  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (!Number.isNaN(parseInt(text[i]))) {
      result += text[i];
    }
  }

  return parseInt(result, 10);
};

// console.log(getNumberFromString("2023 год")); // 2023
// console.log(getNumberFromString("ECMAScript 2022")); // 2022
// console.log(getNumberFromString("1 кефир, 0.5 батона")); // 105
// console.log(getNumberFromString("агент 007")); // 7
// console.log(getNumberFromString("а я томат")); // NaN
// console.log(getNumberFromString(2023)); // 2023
// console.log(getNumberFromString(-1)); // 1
// console.log(getNumberFromString(1.5)); // 15
