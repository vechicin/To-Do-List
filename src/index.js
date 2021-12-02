// IMPORTS
import './style.css';
import { updateToTrue, updateToFalse } from './statusUpdate.js';
// ELEMENTS
const taskContainer = document.querySelector('.list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskTemplate = document.getElementById('template');

const tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

// FUNCTIONS
function createTask(name) {
  return { id: 1, name, completed: false };
}

function saveToLocalStorage() {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function strikeThrough(element) {
  element.style.textDecoration = 'line-through';
}

function checkedBox(element) {
  element.checked = true;
}

function renderTask() {
  taskContainer.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('.checkbox');
    const taskLabel = taskElement.querySelector('label');
    const li = taskElement.querySelector('.task');
    checkbox.id = task.id;
    taskLabel.htmlFor = task.id;
    taskLabel.append(task.name);
    taskContainer.appendChild(taskElement);
    if (task.completed === true) {
      strikeThrough(li);
      checkedBox(checkbox);
    }
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked === true) {
        updateToTrue(task);
        strikeThrough(e.target.parentNode);
        saveToLocalStorage();
      } else {
        updateToFalse(task);
        e.target.parentNode.style.textDecoration = '';
        saveToLocalStorage();
      }
    });
  });
}

// EVENT LISTENERS
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = taskInput.value;
  if (taskName === '') return;
  const task = createTask(taskName);
  taskInput.value = null;
  tasks.push(task);
  saveToLocalStorage();
  renderTask();
});

renderTask();
