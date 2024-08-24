const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now // Sets the default value to the current date/time
    },
    description:String,
    status:Boolean
});
const Todo =mongoose.model('todo',todoSchema);
module.exports = Todo