const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
    {
        name: String,
        email: String,
        username: String,
        password: String,
        partsLogged: Array
    }
);

module.exports = mongoose.model("Data", DataSchema);