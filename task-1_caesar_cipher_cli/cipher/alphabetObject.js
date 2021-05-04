/**
 * Английский алфавит в виде обьекта вида:
 * {
 *  a: '0',
 *  0: 'a'
 * }
 * Каждая буква храниться как в виде буква-индекс, так и индекс-буква,
 * чтобы использовать один обьект для шифрования и расшифрования
 */
export const alphabetObject = Object.fromEntries(
  "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map((letter, index) => {
      return  [[index, letter], [letter, index ]];
    })
    .flat()
);
