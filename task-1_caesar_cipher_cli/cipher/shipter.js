import { alphabetObject } from "./alphabetObject";
import { ENG_MODULE_ALPHABET } from "./constants";
/**
 * Осуществляет сдвиг
 */

export const shifter = (shift) => (letter) => {
  /**
   * Если это не буква английского алфавита, то она не шифруется,
   * а возвращается как есть
   */
  if (alphabetObject[letter] === void 0) {
    return letter;
  }
  /** Индекс текущего символа */
  const startPosition = alphabetObject[letter];
  /** Индекс уже зашифрованной буквы */
  const newPosition = (startPosition + shift) % ENG_MODULE_ALPHABET;
  /**
   * - Смещение прти расшифрование будет отрицательным
   * - Смещение может быть сколь угодно большим и должно сдвигать
   *   учивая колличество букв английского алфавита
   *  */
  return alphabetObject[newPosition];
};
