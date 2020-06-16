const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task : {type : String, unique : true, required : true},
    completed : {type : Boolean, default : false}
});

module.exports = mongoose.model("Todo", TodoSchema);