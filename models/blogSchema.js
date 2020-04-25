const mongoose = require("../database");
const schema = {
    title: { type: mongoose.SchemaTypes.String, required: true },
    content: { type: mongoose.SchemaTypes.String, required: true },
};
const collectionName = "blogs"; // Name of the collection of documents
const blogSchema = mongoose.Schema(schema);
const Blogs = mongoose.model(collectionName, blogSchema);
module.exports = Blogs;