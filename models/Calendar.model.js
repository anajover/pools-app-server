const { Schema, model } = require("mongoose");

const calendarSchema = new Schema ({
    date: {
        type: String,
    },
    endDate: {
        type: String,
    },
    allDay: {
        type: Boolean,
    },
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    hour: {
        type: Number,
    },
    minute: {
        type: Number,
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task"
    },
    worker: {
        type: Schema.Types.ObjectId,
        ref: "Worker"
    },
    title: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    pool: {
        type: Schema.Types.ObjectId,
        ref: "Pool"
    }
})

const CalendarModel = model("Calendar", calendarSchema)

module.exports = CalendarModel