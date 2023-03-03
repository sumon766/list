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

document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});
