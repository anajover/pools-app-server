const { Schema, model } = require("mongoose")

const customerSchema = new Schema ({
    nif: {
        type: String
    },
    name: {
        type:String
    },
    surname: {
        type: String
    },
    phone: {
        type:Number
    },
    address: {
        type:String
    },
    postalCode: {
        type:Number
    },
    city: {
        type:String
    },
    province: {
        type:String
    },
    country: {
        type:String
    },
    contactLanguage: {
        type: String
    },
    email: {
        type:String
    }
})

const CustomerModel = model("Customer", customerSchema)

module.exports = CustomerModel