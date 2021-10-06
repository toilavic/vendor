const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    code : {
        type: String,
        required: true
    },
    vendorName : {
        type: String,
        required: true
    },
    sum : {
        type: Number,
        required: true
    },
    currency : {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    createAt: Date,
    // updateAt: {
    //     type: Date
    // },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

itemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Vendor", itemSchema);