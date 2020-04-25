const mongoose = require('../database');

const schema = {
    task: {
        type: mongoose.SchemaTypes.String, required:true
    },
    isDone: {
        type: mongoose.SchemaTypes.Boolean, required: true
    }
}
const collectionName = "tasks";
const taskSchema = mongoose.Schema(schema)
const TaskModel = mongoose.model(collectionName,taskSchema)
module.exports= TaskModel;