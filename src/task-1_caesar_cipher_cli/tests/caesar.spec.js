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

    it("Ошибка если входной и выходной файл один и тот же", () => {
      const myCLI = chaiExec(`${script} -a decode -i ./src/text -o ./src/text`);
      assert.exitCode(myCLI, 1);
      assert.stderr(myCLI, "The output and input file must not be the same");
    });
  });

  describe("Проверка правильности работы шифратора", () => {
    it("Зашифровать shift = 1 hellow -> ifmmpx", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t1.txt -s 1`
      );
      assert.stdout(myCLI, "ifmmpx\n");
    });

    it("Расшифровать shift = 1 ifmmpx -> hellow", () => {
      const myCLI = chaiExec(
        `${script} -a decode -i ${commonPath}/tests/texts/t2.txt -s 1`
      );
      assert.stdout(myCLI, "hellow\n");
    });

    it("Расшифровать со сдвигом больше алфавита shift = 27 ifmmpx -> hellow", () => {
      const myCLI = chaiExec(
        `${script} -a decode -i ${commonPath}/tests/texts/t2.txt -s 27`
      );
      assert.stdout(myCLI, "hellow\n");
    });

    it("Зашифровать со сдвигом больше алфавита shift = 27 hellow -> ifmmpx", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t1.txt -s 27`
      );
      assert.stdout(myCLI, "ifmmpx\n");
    });

    it("Зашифровать с отрицательным сдвигом shift = -25 hellow -> ifmmpx", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t1.txt -s -25`
      );
      assert.stdout(myCLI, "ifmmpx\n");
    });

    it("Расшифровать со сдвигом больше алфавита shift = -25 ifmmpx -> hellow", () => {
      const myCLI = chaiExec(
        `${script} -a decode -i ${commonPath}/tests/texts/t2.txt -s -25`
      );
      assert.stdout(myCLI, "hellow\n");
    });

    it("Зашифровать c символами не английского алфавита shift = 1 hell_ow 12345 -> ifmm_px 12345", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t3.txt -s 1`
      );
      assert.stdout(myCLI, "ifmm_px 12345\n");
    });

    it("Зашифровать только с символами не английского алфавита shift = 1 привет -> привет", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t4.txt -s 1`
      );
      assert.stdout(myCLI, "привет\n");
    });

    it("Зашифровать c проверкой сохранения регистра shift = 1 Hellow World -> Ifmmpx Xpsme", () => {
      const myCLI = chaiExec(
        `${script} -a encode -i ${commonPath}/tests/texts/t5.txt -s 1`
      );
      assert.stdout(myCLI, "Ifmmpx Xpsme\n");
    });
  });
});

/* ("./task-1_caesar_cipher_cli/index.js --action encode  -i ./task-1_caesar_cipher_cli/tests/hellow  -s 2");
 */
