import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const AlbumForm = (props) => {

    const match = useRouteMatch();
    
    const initialAlbumV = {
        title: '',
        description: '',
        tag: '',
        image: '',
        albumArtist: match.params.id
    }

    const [albumSet, SetAlbumSet] = useState(initialAlbumV);
 
    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        SetAlbumSet({...albumSet, [name]: value});
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        props.AddOrEditAlbum(albumSet);
        SetAlbumSet(initialAlbumV);
    }

    const getAlbumById = async (id) => {
        const albumData = await axios.get(`http://localhost:4000/api/album/${id}`);
        console.log(albumData.data);
        const album = {
            title: albumData.data.title,
            description: albumData.data.description,
            tag: albumData.data.tag,
            image: albumData.data.image,
            albumArtist: albumData.data.albumArtist
        }
        SetAlbumSet(album);
    }

    useEffect(() => {
        if(props.currentId === ''){
            SetAlbumSet(initialAlbumV);
        } else {
            console.log(props.currentId);
            getAlbumById(props.currentId);
        }
    }, [props.currentId]);

    return(
        <div className="row">
            <div className="col col-xxl-5 col-md-9 col-sm-9 mx-auto">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                        <h3 className="card-title text-center" style={{color: 'white'}}>
                            {
                                props.currentId === '' ? 'ADD ALBUM' : 'EDIT ALBUM'
                            }
                        </h3>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#696969'}}>
                        <form onSubmit={handlerSubmit}>
                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control" name="title" placeholder="Title" value={albumSet.title} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="description" placeholder="Description" value={albumSet.description} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="tag" placeholder="Tag" value={albumSet.tag} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="image" placeholder="Image" value={albumSet.image} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    {props.currentId === '' ? 'Add Album' : 'Edit Album'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumForm;