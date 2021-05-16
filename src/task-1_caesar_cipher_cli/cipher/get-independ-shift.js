import { ENG_MODULE_ALPHABET } from "./constants.js";

/**
 * Устанавливает правильное смещение в зависимости
 * от того нужно ли зашифровать или расшифровать файл
 */
export const getIndependShift = ({ shift, action }) => {
  const decodeShift = ENG_MODULE_ALPHABET - (shift % ENG_MODULE_ALPHABET);
  const encodeShift = ENG_MODULE_ALPHABET + (shift % ENG_MODULE_ALPHABET);
  return action === "decode" ? decodeShift : encodeShift;
};
