const weightIndex = 2;
const lengthIndex = 1;


function getFilterTable() {
    let data = [];
    let tableData = getDataTable();
    for (let i = 0; i < tableData.length; i++) {
        let flag = true;
        for (let j = 1; j < arguments.length && flag; j += 2) {
            if (tableData[i][arguments[j]] !== arguments[j - 1]) {
                flag = false;
            }
        }

        if (flag) {
            data.push(tableData[i]);
        }
    }
    return data;
}


function filterTable(weight, length) {
    if (weight === '' && length === '') {
        alert('Введите вес или длину')
        return;
    }
    if (weight !== '') {
        if (isNaN(parseFloat(weight)) || !isFinite(weight) || Number(weight) <= 0) {
            alert('Некорректно введен вес');
            return;
        }
    }
    if (length !== '') {
        if (isNaN(parseFloat(length)) || !isFinite(length) || Number(length) <= 0) {
            alert('Некорректно введена длина');
            return;
        }
    }

    let data;
    if (weight === '' && length !== '') {
        data = getFilterTable(length, lengthIndex);
    } else if (weight !== '' && length === '') {
        data = getFilterTable(weight, weightIndex);
    } else {
        data = getFilterTable(weight, weightIndex, length, lengthIndex);
    }
    
    if (data.length === 0) {
        alert('Ничего не найдено')
    } else {
        printTable(data);
    }
    //return data;
}