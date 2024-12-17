let todos = [];

export const addTodo = (title, category) => {
    const newTodo = {
        id: todos.lenght + 1,
        title: title,
        category: category,
        completed: false,
    }
    todos.push(newTodo);
    return newTodo;
}

export const deleteTodo = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if(index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        return deletedTodo[0];
    }
    return null;
}

export const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if(todo){
        todo.completed = !todo.completed;
        return todo;
    }
    return null;
}

export const filterTodos=(filterType)=> {
    if (filterType === 'completed') {
        return todos.filter(todo => todo.completed);
    } else if (filterType === 'notCompleted') {
        return todos.filter(todo => !todo.completed);
    } else if (filterType === 'category') {
        return (category) => todos.filter(todo => todo.category === category);
    }
    return todos;
}