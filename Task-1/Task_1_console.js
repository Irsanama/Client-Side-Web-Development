// Irsanama
const readline = require('readline');

// Создаем интерфейс для чтения из консоли
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Вспомогательные математические функции
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    const limit = Math.sqrt(num);
    for (let i = 3; i <= limit; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function sieveOfEratosthenes(n) {
    if (n < 2) return [];

    const sieve = new Array(n + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (sieve[i]) {
            for (let j = i * i; j <= n; j += i) {
                sieve[j] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (sieve[i]) primes.push(i);
    }
    return primes;
}

function firstNPrimes(n) {
    const primes = [];
    let num = 2;

    while (primes.length < n) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    return primes;
}

function findDivisors(n) {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== n / i) {
                divisors.push(n / i);
            }
        }
    }
    return divisors.sort((a, b) => a - b);
}

function primeFactors(n) {
    const factors = {};
    let divisor = 2;

    while (n > 1) {
        while (n % divisor === 0) {
            factors[divisor] = (factors[divisor] || 0) + 1;
            n /= divisor;
        }
        divisor++;
    }
    return factors;
}

function isPerfect(num) {
    const divisors = findDivisors(num);
    const sum = divisors.reduce((acc, val) => acc + val, 0);
    return sum === 2 * num;
}

function findPerfectNumbers(n) {
    const perfectNumbers = [];
    let num = 2;

    while (perfectNumbers.length < n && num < 10000) {
        if (isPerfect(num)) {
            perfectNumbers.push(num);
        }
        num++;
    }
    return perfectNumbers;
}

function canBeSumOfThreePrimes(num) {
    if (num < 7) return false;

    if (num % 2 === 0) {
        return isPrime(num - 4);
    } else {
        return isPrime(num - 5);
    }
}

function isFibonacci(num) {
    if (num < 0) return false;

    function isPerfectSquare(x) {
        const s = Math.sqrt(x);
        return s === Math.floor(s);
    }

    return isPerfectSquare(5 * num * num + 4) ||
        isPerfectSquare(5 * num * num - 4);
}

function doubleFactorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;

    let result = 1;
    if (n % 2 === 0) {
        for (let i = 2; i <= n; i += 2) {
            result *= i;
        }
    } else {
        for (let i = 1; i <= n; i += 2) {
            result *= i;
        }
    }
    return result;
}

function pythagoreanTriples(n, m) {
    const triples = [];
    for (let a = n; a <= m; a++) {
        for (let b = a; b <= m; b++) {
            const c = Math.sqrt(a * a + b * b);
            if (c <= m && Number.isInteger(c)) {
                triples.push([a, b, c]);
            }
        }
    }
    return triples;
}

function parseFraction(str) {
    const parts = str.split('/').map(Number);
    if (parts.length !== 2 || parts.some(isNaN)) {
        throw new Error('Неверный формат дроби. Используйте формат a/b');
    }
    return { numerator: parts[0], denominator: parts[1] };
}

function reduceFraction(fraction) {
    const commonDivisor = gcd(fraction.numerator, fraction.denominator);
    return {
        numerator: fraction.numerator / commonDivisor,
        denominator: fraction.denominator / commonDivisor
    };
}

function multiplyFractions(frac1, frac2) {
    const numerator = frac1.numerator * frac2.numerator;
    const denominator = frac1.denominator * frac2.denominator;
    return reduceFraction({ numerator, denominator });
}

function divideFractions(frac1, frac2) {
    const numerator = frac1.numerator * frac2.denominator;
    const denominator = frac1.denominator * frac2.numerator;
    return reduceFraction({ numerator, denominator });
}

function addFractions(frac1, frac2) {
    const numerator = frac1.numerator * frac2.denominator + frac2.numerator * frac1.denominator;
    const denominator = frac1.denominator * frac2.denominator;
    return reduceFraction({ numerator, denominator });
}

function subtractFractions(frac1, frac2) {
    const numerator = frac1.numerator * frac2.denominator - frac2.numerator * frac1.denominator;
    const denominator = frac1.denominator * frac2.denominator;
    return reduceFraction({ numerator, denominator });
}

function divisibleByAllDigits(n, m) {
    const result = [];

    for (let num = n; num <= m; num++) {
        const digits = num.toString().split('').map(Number);
        let divisible = true;

        for (const digit of digits) {
            if (digit === 0 || num % digit !== 0) {
                divisible = false;
                break;
            }
        }

        if (divisible) result.push(num);
    }
    return result;
}

function divisibleBySumOfDigits(n, m) {
    const result = [];

    for (let num = n; num <= m; num++) {
        const digits = num.toString().split('').map(Number);
        const sum = digits.reduce((acc, digit) => acc + digit, 0);
        if (sum !== 0 && num % sum === 0) {
            result.push(num);
        }
    }
    return result;
}

// Функции для взаимодействия с консолью
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

// 1.1. Проверка взаимно простых чисел
async function task1_1_console() {
    console.log('\n--- Проверка взаимно простых чисел ---');
    const input = await askQuestion('Введите два числа через пробел: ');
    const [a, b] = input.split(' ').map(Number);

    if (isNaN(a) || isNaN(b) || a < 1 || b < 1) {
        console.log('Ошибка: введите натуральные числа');
        return;
    }

    const areCoprime = gcd(a, b) === 1;
    const result = areCoprime ?
        `Числа ${a} и ${b} взаимно простые` :
        `Числа ${a} и ${b} НЕ взаимно простые`;
    console.log(result);
}

// 1.2. Проверка простого числа
async function task1_2_console() {
    console.log('\n--- Проверка простого числа ---');
    const input = await askQuestion('Введите число: ');
    const num = parseInt(input);

    if (isNaN(num) || num < 1) {
        console.log('Ошибка: введите натуральное число');
        return;
    }

    const result = isPrime(num) ?
        `Число ${num} простое` :
        `Число ${num} составное`;
    console.log(result);
}

// 1.3. Решето Эратосфена
async function task1_3_console() {
    console.log('\n--- Решето Эратосфена ---');
    const input = await askQuestion('Введите верхнюю границу N: ');
    const n = parseInt(input);

    if (isNaN(n) || n < 1) {
        console.log('Ошибка: введите натуральное число');
        return;
    }

    const primes = sieveOfEratosthenes(n);
    console.log(`Простые числа до ${n}: ${primes.join(', ')}`);
}

// 1.4. Первые N простых чисел
async function task1_4_console() {
    console.log('\n--- Первые N простых чисел ---');
    const input = await askQuestion('Введите количество N: ');
    const n = parseInt(input);

    if (isNaN(n) || n < 1) {
        console.log('Ошибка: введите натуральное число');
        return;
    }

    const primes = firstNPrimes(n);
    console.log(`Первые ${n} простых чисел: ${primes.join(', ')}`);
}

// 1.5. Делители числа
async function task1_5_console() {
    console.log('\n--- Делители натурального числа ---');
    const input = await askQuestion('Введите число N: ');
    const n = parseInt(input);

    if (isNaN(n) || n < 1) {
        console.log('Ошибка: введите натуральное число');
        return;
    }

    const divisors = findDivisors(n);
    console.log(`Делители числа ${n}: ${divisors.join(', ')}`);
}

// 1.6. Разложение на простые множители
async function task1_6_console() {
    console.log('\n--- Разложение на простые множители ---');
    const input = await askQuestion('Введите число N: ');
    const n = parseInt(input);

    if (isNaN(n) || n < 2) {
        console.log('Ошибка: введите натуральное число больше 1');
        return;
    }

    const factors = primeFactors(n);
    console.log(`Простые множители числа ${n}:`);
    for (const [factor, power] of Object.entries(factors)) {
        console.log(`${factor}^${power}`);
    }
}

// 1.7. Совершенные числа
async function task1_7_console() {
    console.log('\n--- Совершенные числа ---');
    const input = await askQuestion('Введите количество N (N<5): ');
    const n = parseInt(input);

    if (isNaN(n) || n < 1 || n > 4) {
        console.log('Ошибка: введите число от 1 до 4');
        return;
    }

    const perfectNums = findPerfectNumbers(n);
    console.log(`Первые ${n} совершенных чисел: ${perfectNums.join(', ')}`);
}

// 1.8. Сумма трёх простых чисел
async function task1_8_console() {
    console.log('\n--- Сумма трех простых чисел ---');
    const inputN = await askQuestion('Введите начало интервала N: ');
    const inputM = await askQuestion('Введите конец интервала M: ');
    const n = parseInt(inputN);
    const m = parseInt(inputM);

    if (isNaN(n) || isNaN(m) || n < 1 || m < 1 || n > m) {
        console.log('Ошибка: введите корректный интервал');
        return;
    }

    const results = [];
    for (let i = n; i <= m; i++) {
        if (i % 2 === 1 && canBeSumOfThreePrimes(i)) {
            results.push(i);
        }
    }

    console.log(`Нечетные числа из [${n},${m}], представимые как сумма трех простых: ${results.join(', ')}`);
}

// 1.9. Проверка числа Фибоначчи
async function task1_9_console() {
    console.log('\n--- Проверка числа Фибоначчи ---');
    const input = await askQuestion('Введите число: ');
    const num = parseInt(input);

    if (isNaN(num) || num < 0) {
        console.log('Ошибка: введите неотрицательное число');
        return;
    }

    const result = isFibonacci(num) ?
        `Число ${num} является числом Фибоначчи` :
        `Число ${num} НЕ является числом Фибоначчи`;
    console.log(result);
}

// 1.10. Двойной факториал
async function task1_10_console() {
    console.log('\n--- Двойной факториал ---');
    const input = await askQuestion('Введите число N: ');
    const n = parseInt(input);

    if (isNaN(n) || n < 0) {
        console.log('Ошибка: введите неотрицательное число');
        return;
    }

    const result = doubleFactorial(n);
    console.log(`${n}!! = ${result}`);
}

// 1.11. Пифагоровы тройки
async function task1_11_console() {
    console.log('\n--- Пифагоровы тройки ---');
    const inputN = await askQuestion('Введите начало интервала N: ');
    const inputM = await askQuestion('Введите конец интервала M: ');
    const n = parseInt(inputN);
    const m = parseInt(inputM);

    if (isNaN(n) || isNaN(m) || n < 1 || m < 1 || n > m) {
        console.log('Ошибка: введите корректный интервал');
        return;
    }

    const triples = pythagoreanTriples(n, m);
    console.log(`Пифагоровы тройки в интервале [${n},${m}]:`);
    if (triples.length === 0) {
        console.log("Не найдено");
    } else {
        triples.forEach(triple => {
            console.log(`(${triple[0]}, ${triple[1]}, ${triple[2]})`);
        });
    }
}

// 1.12. Умножение/деление дробей
async function task1_12_console() {
    console.log('\n--- Умножение/деление дробей ---');
    const input1 = await askQuestion('Введите первую дробь a/b: ');
    const input2 = await askQuestion('Введите вторую дробь c/d: ');

    try {
        const frac1 = parseFraction(input1);
        const frac2 = parseFraction(input2);

        const multiplyResult = multiplyFractions(frac1, frac2);
        const divideResult = divideFractions(frac1, frac2);

        console.log(`Результат умножения: ${multiplyResult.numerator}/${multiplyResult.denominator}`);
        console.log(`Результат деления: ${divideResult.numerator}/${divideResult.denominator}`);
    } catch (e) {
        console.log('Ошибка: ' + e.message);
    }
}

// 1.13. Сложение/вычитание дробей
async function task1_13_console() {
    console.log('\n--- Сложение/вычитание дробей ---');
    const input1 = await askQuestion('Введите первую дробь a/b: ');
    const input2 = await askQuestion('Введите вторую дробь c/d: ');

    try {
        const frac1 = parseFraction(input1);
        const frac2 = parseFraction(input2);

        const addResult = addFractions(frac1, frac2);
        const subtractResult = subtractFractions(frac1, frac2);

        console.log(`Результат сложения: ${addResult.numerator}/${addResult.denominator}`);
        console.log(`Результат вычитания: ${subtractResult.numerator}/${subtractResult.denominator}`);
    } catch (e) {
        console.log('Ошибка: ' + e.message);
    }
}

// 1.14. Деление на все цифры
async function task1_14_console() {
    console.log('\n--- Числа, делящиеся на свои цифры ---');
    const inputN = await askQuestion('Введите начало интервала N: ');
    const inputM = await askQuestion('Введите конец интервала M: ');
    const n = parseInt(inputN);
    const m = parseInt(inputM);

    if (isNaN(n) || isNaN(m) || n < 1 || m < 1 || n > m) {
        console.log('Ошибка: введите корректный интервал');
        return;
    }

    const numbers = divisibleByAllDigits(n, m);
    console.log(`Числа из [${n},${m}], делящиеся на все свои цифры: ${numbers.join(', ')}`);
}

// 1.15. Деление на сумму цифр
async function task1_15_console() {
    console.log('\n--- Числа, делящиеся на сумму цифр ---');
    const inputN = await askQuestion('Введите начало интервала N: ');
    const inputM = await askQuestion('Введите конец интервала M: ');
    const n = parseInt(inputN);
    const m = parseInt(inputM);

    if (isNaN(n) || isNaN(m) || n < 1 || m < 1 || n > m) {
        console.log('Ошибка: введите корректный интервал');
        return;
    }

    const numbers = divisibleBySumOfDigits(n, m);
    console.log(`Числа из [${n},${m}], делящиеся на сумму своих цифр: ${numbers.join(', ')}`);
}

async function mainMenu() {
    console.log('\n=== Математические задачи (Консольная версия) ===');
    console.log('1. Проверка взаимно простых чисел');
    console.log('2. Проверка простого числа');
    console.log('3. Решето Эратосфена');
    console.log('4. Первые N простых чисел');
    console.log('5. Делители натурального числа');
    console.log('6. Разложение на простые множители');
    console.log('7. Совершенные числа');
    console.log('8. Сумма трех простых чисел');
    console.log('9. Проверка числа Фибоначчи');
    console.log('10. Двойной факториал');
    console.log('11. Пифагоровы тройки');
    console.log('12. Умножение/деление дробей');
    console.log('13. Сложение/вычитание дробей');
    console.log('14. Числа, делящиеся на свои цифры');
    console.log('15. Числа, делящиеся на сумму цифр');
    console.log('0. Выход');

    const choice = await askQuestion('Выберите задачу (0-15): ');

    switch (choice) {
        case '1':
            await task1_1_console();
            break;
        case '2':
            await task1_2_console();
            break;
        case '3':
            await task1_3_console();
            break;
        case '4':
            await task1_4_console();
            break;
        case '5':
            await task1_5_console();
            break;
        case '6':
            await task1_6_console();
            break;
        case '7':
            await task1_7_console();
            break;
        case '8':
            await task1_8_console();
            break;
        case '9':
            await task1_9_console();
            break;
        case '10':
            await task1_10_console();
            break;
        case '11':
            await task1_11_console();
            break;
        case '12':
            await task1_12_console();
            break;
        case '13':
            await task1_13_console();
            break;
        case '14':
            await task1_14_console();
            break;
        case '15':
            await task1_15_console();
            break;
        case '0':
            console.log('До свидания!');
            rl.close();
            return;
        default:
            console.log('Неверный выбор. Попробуйте снова.');
    }

    await mainMenu();
}

// Запуск программы
console.log('Добро пожаловать в консольную версию математических задач!');
mainMenu();1