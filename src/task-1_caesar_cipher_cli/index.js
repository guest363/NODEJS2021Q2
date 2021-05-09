import { cliParser } from "./cli/cli-parser.js";
import { ioReader } from "./io-reader/io-reader.js";
import { shifter } from "./cipher/shifter.js";
import { getIndependShift } from "./cipher/get-independ-shift.js";
import { pipeline } from "stream";
import { transformer } from "./io-reader/transformer.js";

const cliParams = cliParser(process);
const independentShift = getIndependShift({
  shift: cliParams.shift,
  action: cliParams.action,
});

const cipher = shifter(independentShift);
const readStream = ioReader({ param: cliParams.input, rwType: "read" });
const writeStream = ioReader({ param: cliParams.output, rwType: "write" });

const runPipe = async () => {
  await pipeline(
    readStream, // input file stream or stdin stream
    transformer(cipher),
    writeStream, // output file stream or stdout stream
    (err) => {
      if (err) {
        console.error(`Failed ${cliParams.action}`, err);
      } else {
        console.log(`File success ${cliParams.action}`);
      }
    }
  );
};

runPipe();
