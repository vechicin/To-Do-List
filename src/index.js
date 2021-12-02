// IMPORTS
import './style.css';
import updateToTrue from './statusUpdate.js';
// ELEMENTS
const list = document.querySelector('.list');
const button = document.createElement('button');
button.innerHTML = 'Clear all completed';
const checkBoxLabel = document.getElementsByTagName('label');

// ARRAY OF OBJECTS
let toDoTasks = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do List project',
    completed: false,
    index: 1,
  },
  {
    description: 'fix car',
    completed: false,
    index: 2,
  },
];

// FUNCTIONS
const populateList = function (array) {
  const result = [];
  array.forEach((element) => {
    const tagText = `<input class="${element.index}" id="checkbox" type="checkbox"><label for="checkbox">${element.description}</label>`;
    result.push(tagText);
  });
  result.forEach((element) => {
    const li = document.createElement('li');
    li.innerHTML = element;
    list.appendChild(li);
  });
};

function checkLocalStorage() {
  if (!localStorage.getItem('ToDoList')) {
    toDoTasks = [];
    localStorage.setItem('ToDoList', JSON.stringify(toDoTasks));
  } else {
    toDoTasks = JSON.parse(localStorage.getItem('ToDoList'));
  }
}

populateList(toDoTasks);
list.appendChild(button);

// EVENT LISTENERS
const checkBox = document.querySelectorAll('#checkbox');
for (let i = 0; i < checkBox.length; i++) {
  checkLocalStorage();
  checkBox[i].addEventListener('click', (e) => {
    if (e.target.checked === true) {
      for (let i = 0; i < toDoTasks.length; i++) {
        if (e.target.className === toDoTasks[i].index.toString()) {
          updateToTrue(toDoTasks[i]);
          e.target.parentNode.style.textDecoration = 'line-through';
          e.target.value = true
          localStorage.setItem('ToDoList', JSON.stringify(toDoTasks));
        }
        if (toDoTasks[i].completed === true) {
        }
      }
    } else {
      for (let i = 0; i < toDoTasks.length; i++) {
        toDoTasks[i].completed = false;
        localStorage.setItem('ToDoList', JSON.stringify(toDoTasks));
      }
      e.target.parentNode.style.textDecoration = '';
    }
  }) 
}

