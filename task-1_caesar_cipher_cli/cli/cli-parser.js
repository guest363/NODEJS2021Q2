import minimist from "minimist";

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
  const argv = minimist(process.argv.slice(2));
  const action = argv.action ?? argv.a;
  if (action) {
    const parcedCliOpt = {
      // 0 shift фактически ничего не делает с файлом
      shift: argv.shift || argv.s || 0,
      input: argv.input || argv.i || process.stdin,
      output: argv.output || argv.o || process.stdout,
      action,
    };
    return parcedCliOpt;
  }

  process.stderr.write("The action param is required");
  process.exit(1);
};
