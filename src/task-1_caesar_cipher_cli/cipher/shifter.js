import { alphabetObject } from "./alphabetObject.js";
import { ENG_MODULE_ALPHABET } from "./constants.js";

/** Проверяет в верхнем ли регистре символ */
const isUpper = (char) => {
  return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
};

/**
 * Осуществляет сдвиг
 */
export const shifter = (shift) => (letters) => {
  const output = [];
  for (let letter of letters) {
    /**
     * Так как в нашем обьекте с алфавитом есть и цифровые поля
     * Если это не буква английского алфавита, то она не шифруется,
     * а возвращается как есть
     */
    if (
      !Number.isNaN(parseInt(letter)) ||
      alphabetObject[String(letter).toLocaleLowerCase()] === void 0
    ) {
      output.push(letter);
    }

    /** Индекс текущего символа */
    const startPosition = isUpper(letter)
      ? alphabetObject[String(letter).toLowerCase()]
      : alphabetObject[letter];

    /** Индекс уже зашифрованной буквы */
    const newPosition = Math.abs(startPosition + shift) % ENG_MODULE_ALPHABET;
    /**
     * - Смещение может быть сколь угодно большим и должно сдвигать
     *   учивая колличество букв английского алфавита
     *  */
    output.push(
      isUpper(letter)
        ? String(alphabetObject[newPosition]).toUpperCase()
        : alphabetObject[newPosition]
    );
  }
  return output.join("");
};
