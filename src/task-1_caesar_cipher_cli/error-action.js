/**
 * Завершает программу и выводит ошибку в стандартный поток ошибок
 * @param {string} message
 */
export const errorAction = (message) => {
  process.stderr.write(message);
  process.exit(1);
};
