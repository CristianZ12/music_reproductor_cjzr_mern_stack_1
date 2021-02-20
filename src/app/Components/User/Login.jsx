import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const initialValues = {
        email: '',
        password: ''
    }

    const history = useHistory();

    const [loginV, setLoginV]= useState(initialValues);

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setLoginV({...loginV, [name]: value});
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const userXd = {
            email: loginV.email,
            password: loginV.password
        }
        const userT = await axios.post('http://localhost:4000/api/user/login', userXd);
        localStorage.setItem('usertoken', userT.data.token);
        const message = userT.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
            return history.push('/profile');
        }
    }

    return(
        <div className="row p-5">
            <div className="col col-xxl-4 col-md-9 col-sm-9 mx-auto">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                        <h3 className="card-title text-center" style={{color: 'white'}}>
                            LOGIN
                        </h3>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#696969'}}>
                        <form onSubmit={handlerSubmit}>
                            <div className="mt-3 mb-3">
                                <input type="email" className="form-control" name="email" placeholder="Email" value={loginV.email} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" name="password" placeholder="Password" value={loginV.password} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;