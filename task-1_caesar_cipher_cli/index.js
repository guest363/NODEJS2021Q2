import { cliParser } from "./cli/cli-parser.js";

const cliParams = cliParser(process);
console.log(cliParams);
