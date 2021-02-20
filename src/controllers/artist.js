const artists = {};

const ArtistModel = require('../models/Artist');

artists.artists = (req, resp) => {
    ArtistModel.find({}, (err, artists) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to get Artists.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ artists });
        }
    });
}

artists.artist = async (req, resp) => {
    const artist1 = await ArtistModel.findById(req.params.id);
    resp.json(artist1);
}

artists.addArtist = (req, resp) => {
    const { fullname, age, city, image } = req.body;
    const addArtist = new ArtistModel({
        fullname,
        age, 
        city,
        image
    });
    addArtist.save((err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Add Artist.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Added Artist.',
                msgError: false
            }});
        }
    });
}

artists.updateArtist = (req, resp) => {
    const { fullname, age, city, image } = req.body;
    ArtistModel.findOneAndUpdate({_id: req.params.id}, {
        fullname,
        age,
        city,
        image
    }, { runValidators: true }, (err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Update Artist.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Updated Artist.',
                msgError: false
            }});
        }
    });
}

artists.deleteUser = (req, resp) => {
    ArtistModel.findOneAndDelete({_id: req.params.id}, (err, doc) => {
        if(err){
            resp.status(200).json({ message: {
                msgBody: 'Unable to Delete Artist.',
                msgError: true
            }});
        } else {
            resp.status(200).json({ message: {
                msgBody: 'Successfully Deleted Artist.',
                msgError: false
            }});
        }
    })
}

module.exports = artists;