import './style.css';
import ListCollection from './modules/ListCollection.js';

const listCollection = new ListCollection();
listCollection.load();
listCollection.read();

const getInputValue = (id) => {
    const inputField = document.querySelector(id);
    const inputValue = inputField.value;
    inputField.value = '';
    return inputValue;
};

const enterBtn = document.querySelector('.enter-btn');
enterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputValue = getInputValue('#inputField');
    listCollection.setLocalData(inputValue);
    listCollection.read();
});

const clearBtn = document.querySelector('.clear-completed');
clearBtn.addEventListener('click', () => {
    const checks = document.querySelectorAll('input[type=checkbox]');
    const updateItem = [];
    checks.forEach((checkbox, i) => {
        if (checkbox.checked) {
            listCollection.data.forEach((item, index) => {
                item.index = index;
            });
            updateItem.push(i);
        }
    });
    const updateList = listCollection.data.filter((item, i) => !updateItem.includes(i));
    updateList.forEach((item, index) => {
        item.index = index;
    });
    listCollection.data = updateList;
    localStorage.setItem('toDoList', JSON.stringify(updateList));
    listCollection.read();
});

document.querySelector('.fa-refresh').addEventListener('click', () => {
    window.location.reload();
    document.querySelector('.fa-refresh').classList.add('refresh');
});
