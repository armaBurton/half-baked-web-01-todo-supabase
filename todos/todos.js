import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector(`input`);
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// on submit, create a todo, reset the form, and display the todos
todoForm.addEventListener(`submit`, async(e) => {
    e.preventDefault();
    await createTodo(todoInput.value);
    await displayTodos();
});

async function displayTodos() {    
    todosEl.textContent = '';

    // fetch the todos
    const todos = await getTodos();
    // display the list of todos
    for (let t of todos){
        const todoBlock = renderTodo(t);
        // be sure to give each todo an event listener
        // on click, complete that todo
        todoBlock.addEventListener(`click`, async() => {
            await completeTodo(t.id);
            displayTodos();
        });
        todosEl.append(todoBlock);
    }
}

// add an on load listener that fetches and displays todos on load
window.addEventListener(`load`, async() => {
    await displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async() => {
    // delete all todos
    await deleteAllTodos();
    await displayTodos();
    // then refetch and display the updated list of todos
});
