import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import axios from 'axios';

const SingForm = (props) => {

    const match = useRouteMatch();

    const initialSingValues = {
        title: '',
        name: '',
        genre: '',
        singerAlbum: match.params.id
    }

    const [singF, setSingF] = useState(initialSingValues);

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setSingF({...singF, [name]: value});
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        props.AddOrEditSing(singF);
        setSingF({...initialSingValues});
    }

    const getSingById = async (id) => {
        const sing1 = await axios.get(`http://localhost:4000/api/singer/${id}`);
        console.log(sing1.data);
        const singTest = {
            title: sing1.data.title,
            name: sing1.data.name,
            genre: sing1.data.genre,
            singerAlbum: sing1.data.singerAlbum
        }
        setSingF(singTest);
    }

    useEffect(() => {
        if(props.currentId === ''){
            setSingF(initialSingValues);
        } else {
            console.log(props.currentId);
            getSingById(props.currentId);
        }
    }, [props.currentId]);

    return(
        <div className="row">
            <div className="col col-xxl-5 col-md-9 col-sm-9 mx-auto">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                        <h3 className="card-title text-center" style={{color: 'white'}}>
                            {
                                props.currentId === '' ? 'ADD SING' : 'EDIT SING'
                            }
                        </h3>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#696969'}}>
                        <form onSubmit={handlerSubmit}>
                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control" name="title" placeholder="Title" value={singF.title} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="name" placeholder="Name" value={singF.name} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="genre" placeholder="Genre" value={singF.genre} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    { props.currentId === '' ? 'Add Sing' : 'Edit Sing'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingForm;