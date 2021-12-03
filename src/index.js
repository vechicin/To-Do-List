// IMPORTS
import './style.css';
import { updateToTrue, updateToFalse } from './statusUpdate.js';
import { clearAllTasks, setIndex } from './script.js';
// ELEMENTS
const taskContainer = document.querySelector('.list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskTemplate = document.getElementById('template');
const clearTasks = document.querySelector('.remove-tasks');

let tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

// FUNCTIONS
function createTask(name) {
  return { id: 0, name, completed: false };
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
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.id = task.id;
    editButton.innerText = 'Edit';
    removeButton.classList.add('remove');
    removeButton.id = task.id;
    removeButton.innerText = 'Remove';
    checkbox.id = task.id;
    taskLabel.htmlFor = task.id;
    taskLabel.innerText = task.name;
    li.appendChild(editButton);
    li.appendChild(removeButton);
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
    editButton.addEventListener('click', () => {
      const editInput = document.createElement('input');
      const saveButton = document.createElement('button');
      editInput.classList.add('edit');
      editInput.type = 'text';
      editInput.placeholder = 'Enter new task here';
      saveButton.type = 'submit';
      saveButton.innerText = 'Save';
      taskLabel.innerText = '';
      li.removeChild(editButton);
      li.removeChild(removeButton);
      li.removeChild(checkbox);
      li.appendChild(editInput);
      li.appendChild(saveButton);
      saveButton.addEventListener('click', () => {
        task.name = editInput.value;
        saveToLocalStorage();
        renderTask();
      });
    });
    removeButton.addEventListener('click', (e) => {
      e.target.parentNode.remove();
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      setIndex(tasks);
      saveToLocalStorage();
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
  setIndex(tasks);
  saveToLocalStorage();
  renderTask();
});

clearTasks.addEventListener('click', (e) => {
  if (e.target) {
    tasks = clearAllTasks(tasks);
    setIndex(tasks);
    saveToLocalStorage();
    renderTask();
  }
});

renderTask();
