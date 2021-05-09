import chaiExec from "@jsdevtools/chai-exec";
import chai from "chai";
const assert = chai.assert;
chai.use(chaiExec);

const script = "node ./src/task-1_caesar_cipher_cli/index.js";

describe("Проверка работы шифра Цезаря", () => {
  describe("Проверка парсинга cli параметров", () => {
    it("Ошибка если нет параметра action", () => {
      const myCLI = chaiExec(script);
      assert.exitCode(myCLI, 1);
    });

    it("Ошибка если параметр action не равен encode or decode", () => {
      const myCLI = chaiExec(`${script} -a decodew`);
      assert.exitCode(myCLI, 1);
      assert.stderr(myCLI, "The action param is must be encode or decode");
    });

    it("Нет ошибки если передан только параметр action", () => {
      const myCLI = chaiExec(`${script} -a decode`);
      assert.exitCode(myCLI, 0);
    });
  });
});

/* ("./task-1_caesar_cipher_cli/index.js --action encode  -i ./task-1_caesar_cipher_cli/tests/hellow  -s 2");
 */
