import { alphabetObject } from "./alphabetObject.js";
import { ENG_MODULE_ALPHABET } from "./constants.js";

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
    if (!Number.isNaN(parseInt(letter)) || alphabetObject[letter] === void 0) {
      output.push(letter);
    }

    /** Индекс текущего символа */
    const startPosition = alphabetObject[letter];
    /** Индекс уже зашифрованной буквы */
    const newPosition = Math.abs(startPosition + shift) % ENG_MODULE_ALPHABET;
    /**
     * - Смещение может быть сколь угодно большим и должно сдвигать
     *   учивая колличество букв английского алфавита
     *  */
    output.push(alphabetObject[newPosition]);
  }
  return output.join("");
};
