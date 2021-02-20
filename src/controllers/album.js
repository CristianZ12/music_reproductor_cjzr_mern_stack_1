const albums = {};

const AlbumModel = require('../models/Album');

albums.albums = (req, resp) => {
    AlbumModel.find({ albumArtist: req.params.id }, (err, albums) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Get Albums.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ albums });
        }
    });
}

albums.album = async (req, resp) => {
    const album = await AlbumModel.findById(req.params.id);
    resp.json(album);
}

albums.addAlbum = (req, resp) => {
    const { title, description, tag, albumArtist, image } = req.body;
    const addAlbum = new AlbumModel({
        title,
        description,
        tag,
        albumArtist,
        image
    });
    addAlbum.save((err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Add Album.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Added Album.',
                msgError: false
            }});
        }
    });
}

albums.updateAlbum = (req, resp) => {
    const { title, description, tag, albumArtist, image } = req.body;
    AlbumModel.findOneAndUpdate({_id: req.params.id}, {
        title,
        description,
        tag,
        albumArtist,
        image
    }, {runValidators: true}, (err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Update Album.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Updated Album.',
                msgError: false
            }});
        }
    });
}

albums.deleteAlbum = (req, resp) => {
    AlbumModel.findOneAndDelete({_id: req.params.id}, (err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Delete Album.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Deleted Album.',
                msgError: false
            }});
        }
    });
}

module.exports = albums;