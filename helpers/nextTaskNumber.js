const CounterModel = require("../models/Counter.model");
const PAD = 10;

const nextTaskNumber = async () => {
    try {

        const doc = await CounterModel.findOneAndUpdate(
            { name: "taskNumber" },
            { $inc: { seq: 1} },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        )

        return String(doc.seq).padStart(PAD, "0");        

    } catch(error) {
        throw error;
    }
}

module.exports = {nextTaskNumber};