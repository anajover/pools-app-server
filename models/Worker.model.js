const { Schema, model } = require("mongoose");

const workerSchema = new Schema ({
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    nif: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    workerType: {
        type: String,
        enum: ["oficina", "operario"]
    },
    taskNumber: {
        type: Schema.Types.ObjectId,
        ref: "Task"
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    taskDate: {
        type: Schema.Types.ObjectId,
        ref: "Calendar"
    }
})

const WorkerModel = model("Worker", workerSchema)

module.exports = WorkerModel