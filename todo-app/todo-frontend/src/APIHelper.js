import axios from 'axios';

URL = "http://localhost:8000/todo";

const getTodoTasks = async () => {
    const { data : tasks } = await axios.get(URL);
    return tasks;
}

const createTodoTask = async (task) => {
    const { data : task } = await axios.post(URL, { task });
    return task;
}

const putTodoTask = async (id, payload) => {
    const {data : task } = await axios.put(`${URL}/${id}`, payload);
    return task;
}

const deleteTodoTask = async (id) => {
    const message = await axios.delete(`${URL}/${id}`);
    return message;
}

export { getTodoTasks, createTodoTask, putTodoTask, deleteTodoTask };