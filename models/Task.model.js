const { Schema, model } = require("mongoose")

const taskSchema = new Schema ({
    isUrgent: {
        type: Boolean,
        default: false,
    },
    taskNumber: {
        type: String,
        unique:true,
        required: true,
    },
    status: {
        type: String,
        enum: ["nueva", "aplazada", "finalizada"],
        default: "nueva"
    },
    customerData: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "Worker"
    },
    poolData: {
        type: Schema.Types.ObjectId,
        ref: "Pool"
    },
    title: {
        type: String,
        default: function () {
            return this.taskNumber; // copia el mismo valor que tiene taskNumber
        }
    },
    date: {
        type: String,
    },
    notes: {
        type: String,
    }
})

const TaskModel = model("Task", taskSchema)

module.exports = TaskModel