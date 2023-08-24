const mongoose = require('mongoose')


const TaskSchema = mongoose.Schema({
    title: { type: String, required: true },
    subTask: [{ st: { type: String } }],
    created_at: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model("Task", TaskSchema) 