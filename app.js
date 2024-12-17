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

