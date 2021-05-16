import { fileReader } from "./file-reader.js";

/**
 * Читает файл или поток ввода\вывода
 * @param {string | stream} o.param - может быть либо путь до файла или поток io
 * @param {'read' | 'write'} o.rwType
 */
export const ioReader = ({ param, rwType }) => {
  const ioStream = fileReader({ param, rwType });

  return ioStream;
};
