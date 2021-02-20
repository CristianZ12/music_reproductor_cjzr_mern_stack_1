const singers = {};

const SingerModel = require('../models/Singer');

singers.singers = (req, resp) => {
    SingerModel.find({ singerAlbum: req.params.id }, (err, singers) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Get Singers.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ singers });
        }
    });
}

singers.singer = async (req, resp) => {
    const singer1 = await SingerModel.findById(req.params.id);
    resp.json(singer1);
}

singers.addSinger = (req, resp) => {
    const { title, name, singerAlbum, genre } = req.body;
    const newSinger = new SingerModel({
        title,
        name,
        singerAlbum,
        genre
    });
    newSinger.save((err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unabled to Add Singer.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Added Singer.',
                msgError: false
            }});
        }
    });
}

singers.updateSinger = (req, resp) => {
    const { title, name, singerAlbum, genre } = req.body;
    SingerModel.findOneAndUpdate({_id: req.params.id}, {
        title,
        name,
        singerAlbum,
        genre
    }, { runValidators: true }, (err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unabled to Update Singer.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Updated Singer.',
                msgError: false
            }});
        }
    });
}

singers.deleteSinger = (req, resp) => {
    SingerModel.findOneAndDelete({_id: req.params.id}, (err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unabled to Delete Singer.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Deleted Singer.',
                msgError: false
            }});
        }
    });
}

module.exports = singers;