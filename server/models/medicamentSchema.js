const mongoose = require("mongoose");

const medicamentSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = {
    medicamentModel: mongoose.model("medicamentModel", medicamentSchema)
}