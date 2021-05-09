import { cliParser } from "./cli/cli-parser.js";
import { ioReader } from "./io-reader/io-reader.js";
import { shifter } from "./cipher/shifter.js";
import { getIndependShift } from "./cipher/get-independ-shift.js";

const cliParams = cliParser(process);
const independentShift = getIndependShift({
  shift: cliParams.shift,
  action: cliParams.action,
});

const cipher = shifter(independentShift);
const readStream = ioReader({ param: cliParams.input, rwType: "read" });

const messageToWrite = [];
readStream.on("data", (chunk) => {
  messageToWrite.push(cipher(chunk));
});

/**
 * Создаем поток записи после закрытия потока чтения
 * чтобы была возможность читать и писать в один и тот же файл
 */
readStream.on("close", () => {
  const writeStream = ioReader({ param: cliParams.output, rwType: "write" });

  writeStream.write(messageToWrite.join(""));
});
