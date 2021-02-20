const { Schema, model } = require('mongoose');

const newSchemaArtist = new Schema({
    fullname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('Artist', newSchemaArtist);