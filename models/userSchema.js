const mongoose = require("../database");
const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: { 
        type: mongoose.SchemaTypes.String, 
        required: true, 
        select: false
    }
};
const collectionName = "user"; // Name of the collection of documents
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);
module.exports = User;