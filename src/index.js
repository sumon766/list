import './style.css';
import './font-awesome/css/font-awesome.css';

const contentDiv = document.querySelector('.content');

const addToDoDiv = document.createElement('div');
contentDiv.appendChild(addToDoDiv);

const addToDoForm = document.createElement('form');
addToDoForm.method = 'post';
addToDoForm.id = 'form';
addToDoDiv.appendChild(addToDoForm);

const addToDoFormInput = document.createElement('input');
addToDoFormInput.type = 'text';
addToDoFormInput.id = 'todo';
addToDoFormInput.name = 'todo';
addToDoFormInput.placeholder = 'Add to your list';
addToDoForm.appendChild(addToDoFormInput);
const addToDoFormButton = document.createElement('button');
addToDoFormButton.type = 'submit';
addToDoForm.appendChild(addToDoFormButton);
const submitIcon = document.createElement('i');
submitIcon.classList = 'fa fa-level-down';
addToDoFormButton.appendChild(submitIcon);

const listsDiv = document.createElement('div');
listsDiv.className = 'lists';
contentDiv.appendChild(listsDiv);

const tasks = [
  {
    index: 1,
    details: 'Test Item 0',
    completed: false,
  },
  {
    index: 0,
    details: 'Test Item 1',
    completed: false,
  },
  {
    index: 2,
    details: 'Test Item 2',
    completed: false,
  },
  {
    index: 3,
    details: 'Test Item 3',
    completed: false,
  },
];

const taskSort = tasks.sort((a, b) => a.index - b.index);

function listTheTasks(tasks) {
  tasks.forEach((task) => {
    const listDiv = document.createElement('div');
    listDiv.className = 'list';
    listsDiv.appendChild(listDiv);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'listItem';
    checkBox.name = 'listitem';
    checkBox.value = task.completed;
    listDiv.appendChild(checkBox);
    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.htmlFor = 'listItem';
    checkBoxLabel.appendChild(document.createTextNode(task.details));
    listDiv.appendChild(checkBoxLabel);
    const dragIcon = document.createElement('i');
    dragIcon.classList = 'fa fa-ellipsis-v';
    listDiv.appendChild(dragIcon);
  });
}
listTheTasks(taskSort);

const allCompleted = document.createElement('button');
allCompleted.className = 'all-completed';
allCompleted.innerText = 'Clear all completed';
contentDiv.appendChild(allCompleted);