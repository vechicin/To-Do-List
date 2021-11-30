// IMPORTS
import _, { forEach } from 'lodash';
import printMe from './print.js';
import './style.css';

//ELEMENTS
const list = document.querySelector('.list');
const button = document.createElement('button');
button.innerHTML = `Clear all completed`;

// ARRAY OF OBJECTS
let toDoTasks = [
  {
  description: 'wash the dishes',
  completed: Boolean,
  index: 0
},
{
  description: 'complete To Do List project',
  completed: Boolean,
  index: 1
},
{
  description: 'fix car',
  completed: Boolean,
  index: 2
},
]

// FUNCTIONS
let populateList = function (array) {
  let result = [];
  array.forEach(element => {
    let tagText = `<input type="checkbox"><label>${element.description}</label>`;
    result.push(tagText);
  });
  result.forEach(element => {
    let li = document.createElement('li');
    li.innerHTML = element;
    list.appendChild(li);
  });
}

populateList(toDoTasks);
list.appendChild(button);
