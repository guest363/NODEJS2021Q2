/**
 * Функция для трансформации потока
 * Каррированная функция которая сначала принимает функцию трансформации
 * а потом source по которому и итерируется
 */
export const transformer = (fn) =>
  async function* (source) {
    source.setEncoding("utf8"); // Work with strings rather than `Buffer`s.
    for await (const chunk of source) {
      yield fn(chunk);
    }
    /** Перенос строки после того как дописали в файл */
    yield "\n";
  };
