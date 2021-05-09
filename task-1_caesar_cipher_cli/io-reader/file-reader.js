import fs from "fs";

/**
 * Создает поток чтения\записи в файл
 * Если передана не строка, возвращает входной параметр без изменения
 * Сам обрабатывает ошибки в случае отсутствия файла
 * @param {string | stream} o.param - может быть либо путь до файла или поток io
 * @param {'encode' | 'decode'} o.rwType
 */
export const fileReader = ({ param, rwType }) => {
  const errorMessages = {
    ENOENT: `No such ${rwType === "read" ? "input" : "output"} file`,
  };

  if (typeof param === "string") {
    const returndStream =
      rwType === "read"
        ? fs.createReadStream(param, { encoding: "utf-8", highWaterMark: 1 })
        : fs.createWriteStream(param, { encoding: "utf-8", flags: "w+" });

    returndStream.on("error", (error) => {
      const customError = errorMessages[error.code] || error.message;

      process.stderr.write(customError);
      process.exit(0);
    });

    return returndStream;
  }
  return param;
};
