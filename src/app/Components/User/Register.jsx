import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    }

    const history = useHistory();

    const [registerV, setRegisterV] = useState(initialValues);

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setRegisterV({...registerV, [name]: value});
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const register1 = {
            firstName: registerV.firstName,
            lastName: registerV.lastName,
            username: registerV.username,
            email: registerV.email,
            password: registerV.password,
            typeAdmin: 0
        }
        const rgster = await axios.post('http://localhost:4000/api/user/register', register1);
        const message = rgster.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
            return history.push('/login');
        }
        setRegisterV({...initialValues});
    }

    return (
        <div className="row p-5">
            <div className="col col-xxl-4 col-md-9 col-sm-9 mx-auto">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                        <h3 className="card-title text-center" style={{color: 'white'}}>REGISTER</h3>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#696969'}}>
                        <form onSubmit={handlerSubmit}> 
                            <div className="mt-3 mb-3">
                                <input type="text" className="form-control" placeholder="First Name" name="firstName" value={registerV.firstName} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Last Name" name="lastName" value={registerV.lastName} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="User Name" name="username" value={registerV.username} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email" name="email" value={registerV.email} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password" name="password" value={registerV.password} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;