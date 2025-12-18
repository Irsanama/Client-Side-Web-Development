// Irsanama
// 1.1. Проверка взаимно простых чисел
function areCoprime(a, b) {
    const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);
    return gcd(a, b) === 1;
}

// 1.2. Проверка простого числа
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// 1.3. Решето Эратосфена
function sieveOfEratosthenes(n) {
    const primes = Array(n + 1).fill(true);
    primes[0] = primes[1] = false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (primes[i]) {
            for (let j = i * i; j <= n; j += i) {
                primes[j] = false;
            }
        }
    }
    return primes.map((isPrime, num) => isPrime ? num : null).filter(val => val !== null);
}

// 1.4. Первые N простых чисел
function firstNPrimes(n) {
    const primes = [];
    let num = 2;
    while (primes.length < n) {
        if (isPrime(num)) primes.push(num);
        num++;
    }
    return primes;
}

// 1.5. Делители числа
function getDivisors(n) {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== n / i) divisors.push(n / i);
        }
    }
    return divisors.sort((a, b) => a - b);
}

// 1.6. Разложение на простые множители
function primeFactors(n) {
    const factors = {};
    let divisor = 2;
    let number = n;
    while (number >= 2) {
        if (number % divisor === 0) {
            factors[divisor] = (factors[divisor] || 0) + 1;
            number /= divisor;
        } else {
            divisor++;
        }
    }
    return factors;
}

// 1.7. Совершенные числа
function isPerfect(num) {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum === num;
}

function firstNPerfectNumbers(n) {
    const perfectNumbers = [];
    let num = 2;
    let count = 0;
    while (count < n) {
        if (isPerfect(num)) {
            perfectNumbers.push(num);
            count++;
        }
        num++;
    }
    return perfectNumbers;
}

// 1.8. Сумма трёх простых чисел
function canBeSumOfThreePrimes(num) {
    if (num < 7 || num % 2 === 0) return false;
    for (let i = 2; i <= num - 4; i++) {
        if (!isPrime(i)) continue;
        for (let j = 2; j <= num - i - 2; j++) {
            if (!isPrime(j)) continue;
            const k = num - i - j;
            if (k >= 2 && isPrime(k)) return true;
        }
    }
    return false;
}

// 1.9. Проверка числа Фибоначчи
function isFibonacci(num) {
    if (num < 0) return false;
    const isPerfectSquare = x => {
        const s = Math.sqrt(x);
        return s === Math.floor(s);
    };
    return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4);
}

// 1.10. Двойной факториал
function doubleFactorial(n) {
    if (n < 0) return undefined;
    let result = 1;
    const start = n % 2 === 0 ? 2 : 1;
    for (let i = start; i <= n; i += 2) {
        result *= i;
    }
    return result;
}

// 1.11. Пифагоровы тройки
function pythagoreanTriples(N, M) {
    const triples = [];
    for (let a = N; a <= M; a++) {
        for (let b = a; b <= M; b++) {
            const c = Math.sqrt(a * a + b * b);
            if (c <= M && Number.isInteger(c)) {
                triples.push([a, b, c]);
            }
        }
    }
    return triples;
}

// 1.12. Умножение/деление дробей
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function operateFractions(a, b, operator) {
    const [num1, den1] = a.split('/').map(Number);
    const [num2, den2] = b.split('/').map(Number);
    let numerator, denominator;

    if (operator === '*') {
        numerator = num1 * num2;
        denominator = den1 * den2;
    } else if (operator === '/') {
        numerator = num1 * den2;
        denominator = den1 * num2;
    }

    const common = gcd(numerator, denominator);
    return `${numerator / common}/${denominator / common}`;
}

// 1.13. Сложение/вычитание дробей
function addSubtractFractions(a, b, operator) {
    const [num1, den1] = a.split('/').map(Number);
    const [num2, den2] = b.split('/').map(Number);
    const commonDenominator = den1 * den2;
    let numerator = operator === '+'
        ? num1 * den2 + num2 * den1
        : num1 * den2 - num2 * den1;

    const common = gcd(numerator, commonDenominator);
    return `${numerator / common}/${commonDenominator / common}`;
}

// 1.14. Деление на все цифры
function divisibleByAllDigits(num) {
    const digits = String(num).split('').map(Number);
    return digits.every(d => d === 0 || num % d === 0);
}

function findNumbersDivisibleByAllDigits(N, M) {
    const result = [];
    for (let i = N; i <= M; i++) {
        if (divisibleByAllDigits(i)) {
            result.push(i);
        }
    }
    return result;
}

// 1.15. Деление на сумму цифр
function divisibleByDigitSum(num) {
    const sum = String(num).split('').reduce((acc, digit) => acc + Number(digit), 0);
    return num % sum === 0;
}

function findNumbersDivisibleByDigitSum(N, M) {
    const result = [];
    for (let i = N; i <= M; i++) {
        if (divisibleByDigitSum(i)) {
            result.push(i);
        }
    }
    return result;
}

// Тестирование всех функций
console.log("=== 1.1. Проверка взаимно простых чисел ===");
console.log(`14 и 25: ${areCoprime(14, 25)}`); // true
console.log(`15 и 25: ${areCoprime(15, 25)}`); // false
console.log(`8 и 9: ${areCoprime(8, 9)}`); // true

console.log("\n=== 1.2. Проверка простого числа ===");
console.log(`17: ${isPrime(17)}`); // true
console.log(`18: ${isPrime(18)}`); // false
console.log(`2: ${isPrime(2)}`); // true

console.log("\n=== 1.3. Решето Эратосфена (1..30) ===");
console.log(sieveOfEratosthenes(30));

console.log("\n=== 1.4. Первые 10 простых чисел ===");
console.log(firstNPrimes(10));

console.log("\n=== 1.5. Делители числа 28 ===");
console.log(getDivisors(28));

console.log("\n=== 1.6. Разложение на простые множители 84 ===");
console.log(primeFactors(84));

console.log("\n=== 1.7. Первые 4 совершенных числа ===");
console.log(firstNPerfectNumbers(4));

console.log("\n=== 1.8. Нечетные числа 15-25 как сумма трех простых ===");
for (let i = 15; i <= 25; i += 2) {
    console.log(`${i}: ${canBeSumOfThreePrimes(i)}`);
}

console.log("\n=== 1.9. Проверка чисел Фибоначчи ===");
console.log(`8: ${isFibonacci(8)}`); // true
console.log(`10: ${isFibonacci(10)}`); // false
console.log(`13: ${isFibonacci(13)}`); // true

console.log("\n=== 1.10. Двойной факториал ===");
console.log(`5!! = ${doubleFactorial(5)}`); // 15
console.log(`6!! = ${doubleFactorial(6)}`); // 48
console.log(`7!! = ${doubleFactorial(7)}`); // 105

console.log("\n=== 1.11. Пифагоровы тройки (1..20) ===");
console.log(pythagoreanTriples(1, 20));

console.log("\n=== 1.12. Умножение/деление дробей ===");
console.log(`2/3 * 3/4 = ${operateFractions('2/3', '3/4', '*')}`); // 1/2
console.log(`2/3 ÷ 3/4 = ${operateFractions('2/3', '3/4', '/')}`); // 8/9

console.log("\n=== 1.13. Сложение/вычитание дробей ===");
console.log(`1/2 + 1/3 = ${addSubtractFractions('1/2', '1/3', '+')}`); // 5/6
console.log(`1/2 - 1/3 = ${addSubtractFractions('1/2', '1/3', '-')}`); // 1/6

console.log("\n=== 1.14. Числа, делящиеся на все свои цифры (10..30) ===");
console.log(findNumbersDivisibleByAllDigits(10, 30));

console.log("\n=== 1.15. Числа, делящиеся на сумму цифр (10..30) ===");
console.log(findNumbersDivisibleByDigitSum(10, 30));