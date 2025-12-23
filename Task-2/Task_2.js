// Irsanama
// 2.1. Преобразование kebab-case в snake-case
function kebabToCamel(str) {
    return str.split('-').map((word, index) =>
        index === 0 ? word : word.at(0).toUpperCase() + word.slice(1)
    ).join('');
}

// 2.2. Работа с массивами
const original = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const copy1 = original.slice();
const copy2 = [...original];
copy1.reverse();
copy2.sort((a, b) => a - b);

// 2.3. Переводчик
const dictionary = {
    'hello': { 'ru': 'привет', 'de': 'hallo' },
    'world': { 'ru': 'мир', 'de': 'welt' },
    'cat': { 'ru': 'кот', 'de': 'katze' },
    'dog': { 'ru': 'собака', 'de': 'hund' }
};

function translate(text, lang) {
    return dictionary[text]?.[lang] || text;
}

// 2.4. Дни недели
const weekDays = {
    1: 'Понедельник',
    2: 'Вторник',
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    7: 'Воскресенье',

    getCurrentDay() {
        const today = new Date().getDay();
        return this[today === 0 ? 7 : today];
    }
};

// 2.5. Персонал
const personnel = {
    'Директор': 'Иван Сишник',
    'Менеджер': 'Петр Джавов'
};

const personnel2 = JSON.parse(JSON.stringify(personnel));
personnel2['Менеджер'] = 'Игорь Питонов';

// 2.6. Предметы
const subjects = {
    list: 'Математика,Физика,Химия',

    addSubject(subject) {
        const arr = this.list.split(',');
        if (!arr.includes(subject)) {
            arr.push(subject);
            this.list = arr.join(',');
        }
    },

    removeSubject(subject) {
        const arr = this.list.split(',');
        const index = arr.indexOf(subject);
        if (index !== -1) {
            arr.splice(index, 1);
            this.list = arr.join(',');
        }
    }
};

// Вывод всех результатов
console.log('=== 2.1 Преобразование строки ===');
console.log(kebabToCamel('background-color'));

console.log('\n=== 2.2 Работа с массивами ===');
console.log('Исходный:', original);
console.log('Копия 1 (reverse):', copy1);
console.log('Копия 2 (sort):', copy2);

console.log('\n=== 2.3 Переводчик ===');
console.log('hello -> ru:', translate('hello', 'ru'));
console.log('hello -> ru:', translate('hello', 'ru'));
console.log('cat -> ru:', translate('cat', 'ru'));
console.log('dog -> ru:', translate('dog', 'ru'));

console.log('\n=== 2.4 Дни недели ===');
console.log('Текущий день:', weekDays.getCurrentDay());

console.log('\n=== 2.5 Персонал ===');
console.log('Оригинал:\n' + JSON.stringify(personnel, null, 2));
console.log('Копия:\n' + JSON.stringify(personnel2, null, 2));

console.log('\n=== 2.6 Предметы ===');
console.log('Начальный список:', subjects.list);
subjects.addSubject('Биология');
console.log('После добавления Биологии:', subjects.list);
subjects.removeSubject('Физика');
console.log('После удаления Физики:', subjects.list);