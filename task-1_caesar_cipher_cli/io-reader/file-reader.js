import fs from "fs";
/**
 * Создает поток чтения\записи в файл
 * Если передана не строка, возвращает входной параметр без изменения
 * Сам обрабатывает ошибки в случае отсутствия файла
 * @param {string | stream} o.param - может быть либо путь до файла или поток io
 * @param {'encode' | 'decode'} o.rwType
 */
export const fileReader = ({ param, rwType }) => {
  if (typeof param === "string") {
    return rwType === "read"
      ? fs.createReadStream(param)
      : fs.createWriteStream(param);
  }
  return param;
};
