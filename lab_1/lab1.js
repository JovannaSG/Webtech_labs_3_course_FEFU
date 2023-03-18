/**
 * Ввести последовательность чисел, 
 * признаком конца ввода является любое нечисловое значение, введенное пользователем. 
 * Определить сколько из них больше своих «соседей», то есть предыдущего и последующего числа.
 */
function ex_1() {
    document.writeln('<b>Задание 1</b>');

    let current = null;
    let previous = null;
    let following = null;
    let count = 0;

    do {
        if ((parseFloat(current) > parseFloat(previous)) 
            && (parseFloat(current) > parseFloat(following))
            && current != null
            && previous != null)
            {
                count += 1;
            }
        previous = current;
        current = following;
        following = prompt('Введите число', '');
    } while (!isNaN(parseFloat(following)) && isFinite(following));

    console.log(`count: ${count}`);
    document.write(`<p>Количество чисел, которые больше своих соседей: ${count}</p>`);
}

/**
 * Вспомогательная функция для упражнения 2
 */
function TableForEven(n) {
    let html = '<div><table>';

    for (let i = 0; i < n / 2; i++) {
        html += '<tr>';
        for (let j = 0; j < n / 2; j++) {
            html += '<td></td>';
        }

        for (let j = 0; j < n / 2; j++) {
            if (j < (n / 2) - i) {
                html += '<td class="grey_cell"></td>';
            }
            else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }

    // ----------------------------------------------------------------
    for (let i = 0; i < n / 2; i++) {
        html += '<tr>';
        for (let j = 0; j < n / 2; j++) {
            if (j < (n / 2) - i) {
                html += '<td class="grey_cell"></td>';
            }
            else {
                html += '<td></td>';
            }
        }

        for (let j = 0; j < n / 2; j++) {
            html += '<td class="grey_cell"></td>';
        }
        html += '</tr>';
    }

    html += '</table></div>';
    return html;
}

/**
 * Вспомогательная функция для упражнения 2
 */
function TableForOdd(n) {
    let html = '<div><table>';

    for (let i = 0; i < Math.trunc(n / 2) + 1; i++) {
        html += '<tr>';
        for (let j = 0; j < Math.trunc(n / 2) + 1; j++) {
            html += '<td></td>';
        }

        for (let j = 0; j < Math.trunc(n / 2); j++) {
            if (j < (n / 2) - i) {
                html += '<td class="grey_cell"></td>';
            }
            else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
    }

    // ----------------------------------------------------------------
    for (let i = 0; i < Math.trunc(n / 2); i++) {
        html += '<tr>';
        for (let j = 0; j < Math.trunc(n / 2) + 1; j++) {
            if (j < (n / 2) - i) {
                html += '<td class="grey_cell"></td>';
            }
            else {
                html += '<td></td>';
            }
        }

        for (let j = 0; j < Math.trunc(n / 2); j++) {
            html += '<td class="grey_cell"></td>';
        }
        html += '</tr>';
    }

    html += '</table></div>';
    return html;
}

/**
 * Для введенного пользователем n (2 < n < 15) сформировать страницу, на которую сначала выводится
 * n горизонтальных линий (шириной от 100% до (100 / n)%), 
 * затем таблица, а затем 
 * n горизонтальных линий (шириной от (100 / n)% до 100%). 
 */
function ex_2() {
    document.writeln('<b>Задание 2</b>');
    // 8 14 11
    let n = prompt('Введите n (2 < n < 15', '');

    if (isNaN(parseFloat(n)) || !isFinite(n) || n <= 2 || n >= 15) {
        alert('n должно быть числом и 2 < n < 15');
    }
    else {
        // Выводим n линий шириной от 100% до (100 / n)%
        for (let i = 1; i <= n; i++) {
            document.write(`<hr width="${100 / i}%">`);
        }

        // Выводим таблицу
        let html;
        if (n / 2 % 1 === 0) {
            html = TableForEven(n);
        }
        else {
            html = TableForOdd(n);
        }
        document.write(html);

        // Выводим n линий шириной от (100 / n)% до 100%
        for (let i = n; i >= 1; i--) {
            document.write(`<hr width="${100 / i}%">`);
        }
    }
}

/**
 * Дана строка, состоящая из слов и чисел, разделенных пробелами. 
 * Подсчитать сумму цифр всех чисел строки 
 * (в сумму включить и цифры, расположенные в дробной части вещественных чисел).
 */
function ex_3() {
    document.writeln('<b>3 задание</b>');

    // 123 rr440.55 tt 1.5 15rr sum = 12
    let str = prompt('Введите строку', '');
    let sum = 0;
    let help_str = '';

    let i = 0;
    while (i < str.length) {
        while (i < str.length && str[i] == ' ') {
            i++;
        }

        while (i < str.length && str[i] != ' ') {
            help_str += str[i];
            i++;
        }

        if (!(isNaN(parseFloat(help_str)) || !isFinite(help_str))) {
            for (let j = 0; j < help_str.length; j++) {
                if (help_str[j] != '.') {
                    sum += Number(help_str[j]);
                }
            }
        }

        help_str = '';
        i++;
    }

    document.write(`<p>Введенная строка: ${str}</p>`);
    document.write(`<p>Сумма: ${sum}</p>`);
}


ex_1();
//ex_2();
//ex_3();