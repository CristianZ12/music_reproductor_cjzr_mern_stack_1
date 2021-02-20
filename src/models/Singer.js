const { Schema, model } = require('mongoose');

const newSchemaSinger = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    singerAlbum: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('Singer', newSchemaSinger);
