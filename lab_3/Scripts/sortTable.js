function getDataTable() {
    let data = [];
    let table = document.getElementById('table');
    let rows = table.querySelector('tbody').querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        let arr = [];
        for (let j = 0; j < cells.length; j++) {
            arr.push(cells[j].innerHTML);
            if ((j + 1) % cells.length  === 0) {
                data.push(arr);
            }
        }
    }
    return data;
}


function change(k, p, tableData) {
    let w = tableData[k];
    tableData[k] = tableData[p];
    tableData[p] = w;
}


function doCompare(element1, element2, sortOrder) {
    if (isNaN(parseFloat(element1)) || !isFinite(element1)) {
        let a = element1.localeCompare(element2);
        if (sortOrder) {
            if (a === -1) {
                return -1;
            } else  if (a === 1) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (a === -1) {
                return 1;
            } else if (a === 1) {
                return -1;
            } else {
                return 0;
            }
        }
    } else {
        let e1 = Number(element1);
        let e2 = Number(element2);
        if (sortOrder) {
            if (e1 < e2) {
                return 1;
            } else if (e1 > e2) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (e1 < e2) {
                return -1;
            } else if (e1 > e2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}


function isCompareOrder(arrCompare, first, second) {
    for (let k = 0; k < arrCompare.length; k += 2) {
        let f = doCompare(first[arrCompare[k]], second[arrCompare[k]], arrCompare[k + 1]);
        if (f === 1) {
            return true;
        } else if (f === 0) {
        // переходим к сравнению следующего поля
        } else {
            return false;
        }
    }
}


function sort(arr) {
    let tableData = getDataTable();  // массив с массивами с данными из строк таблицы
    let n = tableData.length;
    for (let i = 0; i < n - 1; i++) {
        let flag = true;
        for (let j = 0; j < n - i - 1; j++) {
            if (isCompareOrder(arr, tableData[j], tableData[j + 1])) {
                change(j, j + 1, tableData);
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return tableData;
}


function printTable(tableData) {
    let table = document.getElementById('table');
    let rows = table.querySelector('tbody').querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        if (tableData[i] === undefined) {
            rows[i].parentElement.removeChild(rows[i]);
        } else {
            for (let j = 0; j < cells.length; j++) {
                cells[j].innerHTML = tableData[i][j];
            }
        }
    }
}


function howSortTable(sortFirst, descFirst, sortSecond, descSecond, sortThird, descThird) {
    let rightArr = [];

    if (+sortFirst === 0) {
        alert('Выберите первый уровень сортировки!');
    } else {
        rightArr.push(+sortFirst - 1);
        rightArr.push(descFirst);

        if (+sortSecond !== 0) {
            if (+sortFirst !== +sortSecond) {
                rightArr.push(+sortSecond - 1);
                rightArr.push(descSecond);
            } else {
                alert('Второй уровень сортировки не должен совпадать с первым');
                return;
            }
        }

        if (+sortThird !== 0) {
            if (+sortSecond !== 0) {
                if (+sortThird !== +sortFirst && +sortThird !== +sortSecond) {
                    rightArr.push(+sortThird - 1);
                    rightArr.push(descThird);
                } else {
                    alert('Третий уровень не должен совпадать с первым и вторым уровнями');
                    return;
                }
            } else {
                alert('Выберите второй уровень сортировки');
                return;
            }
        }
    }

    console.log(sort(rightArr));
    printTable(sort(rightArr));
}