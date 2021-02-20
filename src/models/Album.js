const { Schema, model } = require('mongoose');

const newSchemaAlbum = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    albumArtist: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model('Album', newSchemaAlbum);

