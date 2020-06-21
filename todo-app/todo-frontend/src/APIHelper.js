import axios from 'axios';

const API_URL = "http://localhost:8000/todo";

const getTodoTasks = async () => {
    const { data : tasks } = await axios.get(API_URL);
    return tasks;
}

const createTodoTask = async value => {
    const { data : task } = await axios.post(API_URL, { task : value });
    return task;
}

const putTodoTask = async (id, payload) => {
    const { data : task } = await axios.put(`${API_URL}/${id}`, payload);
    return task;
}

const deleteTodoTask = async (id) => {
    const message = await axios.delete(`${API_URL}/${id}`);
    return message;
}

export { getTodoTasks, createTodoTask, putTodoTask, deleteTodoTask };