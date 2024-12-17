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

