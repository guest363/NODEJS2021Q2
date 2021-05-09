import { cliParser } from "./cli/cli-parser.js";
import { ioReader } from "./io-reader/io-reader.js";
import { shifter } from "./cipher/shifter.js";
import { getIndependShift } from "./cipher/get-independ-shift.js";
import { pipeline } from "stream";

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
    async function* (source) {
      for await (const chunk of source) {
        yield cipher(chunk);
      }
    }, // Transform stream
    writeStream, // output file stream or stdout stream
    (err) => {
      if (err) {
        console.error("Pipeline failed.", err);
      } else {
        console.log("Pipeline succeeded.");
      }
    }
  );
};

runPipe();
