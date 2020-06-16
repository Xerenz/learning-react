const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Todo = require("./models/todo");

// setting up mongoose
mongoose.connect("mongodb://localhost/todo-app", {
    keepAlive : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
});
mongoose.set("debug", true);
mongoose.Promise = Promise;

// setting up app
const app = express();
// setting up app to process cross domain http requests
app.use(cors());
// setting up  app to parse json objects
app.use(bodyParser.json());

// success function
const success = (res, payload) => {
    return res.status(200).json(payload);
}

// setting api endpoints
app.get("/todo", async (req, res, next) => {
    try {
        const tasks = await Todo.find({});
        return success(res, tasks);
    } catch(err) {
        console.log("*Failed to get user tasks");
        next({ status : 400, message : "failed to get tasks "});
    }
});

app.post("/todo", async (req, res, next) => {
    try {
        const task = await Todo.create(req.body);
        return success(res, task);
    } catch(err) {
        console.log("*Failed to create user task");
        next({ status : 400, message : "failed to create task"});
    }
});

app.put("/todo/:id", async (req, res, next) => {
    try {
        const task = await Todo.findByIdAndUpdate(
            req.params.id, req.body, {new : true});
        return success(res, task);
    } catch(err) {
        console.log("*Failed to put user task", req.params.id);
        next({ status : 400, message : "failed to put task"});
    }
});

app.delete("/todo/:id", async (req, res, next) => {
    try {
        const task = await Todo.findByIdAndDelete(req.params.id);
        return success(res, task);
    } catch(err) {
        console.log("*Failed to delete user task", req.params.id);
        next({ status : 400, message : "failed to delete task"});
    }
});

app.get("/*", (req, res, next) => {
    console.log("*The user requested path", req.path, "was not found");
    next({status : 404, message : "requested URL does not exist"});
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Listening to port", PORT));