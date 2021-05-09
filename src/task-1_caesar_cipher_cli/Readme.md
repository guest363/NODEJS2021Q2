# Запуск
## Шаг 1
В склонированом репозитории выполнить:
```bash
npm i
```
## Шаг 2
Запустить автоматические тесты:
```bash
npm run test
```
Тестами покрыты: 
- Частичная проверка cli парсинга;
- Правильность работы шифратора;

## Шаг 3
Попробовать протестировать в ручном режиме
```bash
node ./src/task-1_caesar_cipher_cli/index.js --action encode -s 1
```
Поддержка параметров:
- -s, --shift: a shift
- -i, --input: an input file
- -o, --output: an output file
- -a, --action: an action encode/decode