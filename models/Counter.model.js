const {Schema, model} = require("mongoose");

const counterSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number,
        default: 0
    }
}, { versionKey: false } );

const CounterModel = model("Counter", counterSchema)

module.exports = CounterModel