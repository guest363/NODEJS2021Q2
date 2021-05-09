import { ENG_MODULE_ALPHABET } from "./constants";

/**
 * Устанавливает правильное смещение в зависимости
 * от того нужно ли зашифровать или расшифровать файл
 */
export const getIndependShift = ({ shift, action }) => {
  return action === "decode" ? shift - ENG_MODULE_ALPHABET : shift;
};
