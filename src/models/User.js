const { Schema, model } = require('mongoose');

const newSchemaUser = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    typeAdmin: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model('Users', newSchemaUser);