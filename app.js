let todos = [];

// Funzione per caricare i Todo dal localStorage
const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        return JSON.parse(storedTodos);
    }
    return [];
};

// Funzione per salvare i Todo nel localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Funzione per aggiungere un nuovo Todo
const addTodo = (title, category) => {
    if (!title || !category) {
        alert("Per favore, inserisci un titolo e una categoria.");
        return;
    }
    const newTodo = {
        id: todos.length + 1, // Generiamo un ID univoco per ogni Todo
        title: title,
        category: category,
        completed: false, // Di default, un Todo non è completato
    };
    todos.push(newTodo);
    saveTodos(); // Salviamo nel localStorage
    renderTodos(todos); // Rendi visibili i Todo
};

// Funzione per gestire l'aggiunta dei Todo tramite l'input
const addTodoFromInput = () => {
    const title = document.getElementById('todoTitle').value;
    const category = document.getElementById('todoCategory').value;
    addTodo(title, category);

    // Dopo aver aggiunto il Todo, puliamo i campi di input
    document.getElementById('todoTitle').value = '';
    document.getElementById('todoCategory').value = '';
};

// Funzione per eliminare un Todo dato l'id
const deleteTodo = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        saveTodos(); // Salviamo nel localStorage
        renderTodos(todos); // Rendi visibili i Todo
    }
};

// Funzione per cambiare lo stato di completamento di un Todo
const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(); // Salviamo nel localStorage
        renderTodos(todos); // Rendi visibili i Todo
    }
};

// Funzione per filtrare i Todo
const applyFilter = (filterType) => {
    let filteredTodos;
    if (filterType === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filterType === 'notCompleted') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else {
        filteredTodos = todos;
    }
    renderTodos(filteredTodos);
};

// Funzione per filtrare i Todo per categoria
const applyCategoryFilter = (category) => {
    const filteredTodos = category ? todos.filter(todo => todo.category === category) : todos;
    renderTodos(filteredTodos);
};

// Funzione per visualizzare i Todo
const renderTodos = (filteredTodos) => {
    const todoListContainer = document.querySelector('.todo-list');
    todoListContainer.innerHTML = ''; // Pulisce la lista esistente

    filteredTodos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-item');
        if (todo.completed) {
            todoElement.classList.add('completed');
        }
        todoElement.innerHTML = `
            ${todo.title} (${todo.category})
            <button onclick="toggleComplete(${todo.id})">${todo.completed ? 'Non Completato' : 'Completato'}</button>
            <button onclick="deleteTodo(${todo.id})">Elimina</button>
        `;
        todoListContainer.appendChild(todoElement);
    });
};


// Funzione per modificare titolo e categoria di un TODO
export const editTodo = (id, newTitle, newCategory) => {
    const todoItem = todos.find(todo => todo.id === id);
    if (todoItem) {
        todoItem.title = newTitle ?? todoItem.title;           // Modifica il titolo solo se fornito
        todoItem.category = newCategory ?? todoItem.category;  // Modifica la categoria solo se fornita
        return todoItem; 
    }
    return null;
}


const updateTodoCounters = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    const notCompletedCount = todos.filter(todo => !todo.completed).length;

    // Aggiorniamo i conteggi nel DOM
    document.getElementById('completedCount').textContent = `Completati: ${completedCount}`;
    document.getElementById('notCompletedCount').textContent = `Non Completati: ${notCompletedCount}`;
};

updateTodoCounters();


// Carica e visualizza i Todo iniziali
todos = loadTodos();
renderTodos(todos);