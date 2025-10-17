const { Schema, model } = require("mongoose");

const poolSchema = new Schema ({
    height: {
        type: Number,
    },
    width: {
        type: Number,
    },
    deep: {
        type: Number,
    },
    volume: {
        type: Number,
    },
    waterType: {
        type: String,
        enum: ["sal","cloro","natural"],
    },
    picture: {
        type: [String],
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    }
})



const PoolModel = model("Pool", poolSchema)

module.exports = PoolModel