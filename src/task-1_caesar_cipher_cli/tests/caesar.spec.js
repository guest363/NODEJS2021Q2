import chaiExec from "@jsdevtools/chai-exec";
import chai from "chai";
const assert = chai.assert;
chai.use(chaiExec);
const commonPath = "./src/task-1_caesar_cipher_cli";
const script = `node ${commonPath}/index.js`;

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

  describe("Проверка правильности работы шифратора", () => {
    it("Зашифровать shift = 1 hellow -> ifmmpx", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t1.txt -s 1`
      );
      assert.stdout(myCLI, "ifmmpx");
    });

    it("Расшифровать shift = 1 ifmmpx -> hellow", () => {
      const myCLI = chaiExec(
        `${script} -a decode -i ${commonPath}/tests/texts/t2.txt -s 1`
      );
      assert.stdout(myCLI, "hellow");
    });

    it("Расшифровать со сдвигом больше алфавита shift = 27 ifmmpx -> hellow", () => {
      const myCLI = chaiExec(
        `${script} -a decode -i ${commonPath}/tests/texts/t2.txt -s 27`
      );
      assert.stdout(myCLI, "hellow");
    });

    it("Зашифровать со сдвигом больше алфавита shift = 27 hellow -> ifmmpx", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t1.txt -s 27`
      );
      assert.stdout(myCLI, "ifmmpx");
    });

    it("Зашифровать с отрицательным сдвигом shift = -25 hellow -> ifmmpx", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t1.txt -s -25`
      );
      assert.stdout(myCLI, "ifmmpx");
    });

    it("Расшифровать со сдвигом больше алфавита shift = -25 ifmmpx -> hellow", () => {
      const myCLI = chaiExec(
        `${script} -a decode -i ${commonPath}/tests/texts/t2.txt -s -25`
      );
      assert.stdout(myCLI, "hellow");
    });
  });
});

/* ("./task-1_caesar_cipher_cli/index.js --action encode  -i ./task-1_caesar_cipher_cli/tests/hellow  -s 2");
 */
