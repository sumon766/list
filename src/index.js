import _ from 'lodash';
import './style.css';
import './font-awesome/css/font-awesome.css'

const container = document.getElementById('container');

const contentDiv = document.createElement('div');
contentDiv.className = 'content';
container.appendChild(contentDiv);

const todoDiv = document.createElement('div');
todoDiv.className = 'todo';
contentDiv.appendChild(todoDiv);

const todoTitle = document.createElement('h1');
todoTitle.innerText = "Today's To Do";
todoDiv.appendChild(todoTitle);

const refreshBtn = document.createElement('button');
refreshBtn.type = 'button';
const refreshIcon = document.createElement('i');
refreshIcon.classList = "fa fa-refresh";
refreshBtn.appendChild(refreshIcon);
todoDiv.appendChild(refreshBtn);

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

let tasks = [
    {
        'index': 0,
        'details': 'Test Item 0',
        'completed': false
    },
    {
        'index': 1,
        'details': 'Test Item 1',
        'completed': false
    },
    {
        'index': 2,
        'details': 'Test Item 2',
        'completed': false
    },
    {
        'index': 3,
        'details': 'Test Item 3',
        'completed': false
    },
];

function listTheTasks (tasks) {
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
listTheTasks(tasks);

const allCompleted = document.createElement('button');
allCompleted.className = 'all-completed';
allCompleted.innerText = 'Clear all completed'
contentDiv.appendChild(allCompleted);