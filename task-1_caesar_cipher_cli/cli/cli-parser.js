import commander from "commander";

/**
 * Если задан параметр как в короткой нотации, -а, так и в
 * длинной, --action, длянная нотация приоритетнее.
 *
 * -s, --shift: a shift
 * -i, --input: an input file
 * -o, --output: an output file
 * -a, --action: an action encode/decode
 *
 * Action (encode/decode) and the shift are required, if one of them missed - an error
 * should be shown, the process should exit with non-zero status code.
 * If the input file is missed - use stdin as an input source.
 * If the output file is missed - use stdout as an output destination.
 * If the input and/or output file is given but doesn't exist or you can't read it
 * (e.g. because of permissions or it is a directory) - human-friendly error should be printed in stderr.
 *
 *
 */
export const cliParser = (process) => {
  commander
    .description(
      "Implement CLI tool that encode and decode a text by Caesar cipher"
    )
    .option("-s, --shift <number>", "a shift", 0)
    .option("-i, --input <type>", "an input file", "process.stdin")
    .option("-o, --output <type>", "an output file", "process.stdout")
    .requiredOption("-a, --action <type>", "encode | decode");

  const argv = commander.parse().opts();
  const action = argv.action;

  if (action === "encode" || action === "decode") {
    const parcedCliOpt = {
      // 0 shift фактически ничего не делает с файлом
      shift: parseInt(argv.shift),
      input: argv.input || process.stdin,
      output: argv.output || process.stdout,
      action,
    };
    return parcedCliOpt;
  }

  process.stderr.write("The action param is must be encode or decode");
  process.exit(1);
};
