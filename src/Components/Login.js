import React, {useState} from 'react'; 
import {useDispatch} from 'react-redux'; 
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import "bootstrap/dist/css/bootstrap.min.css";

import { startAddUser } from '../Actions/usersAction';

const Login = (props)=>
{
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errors, setErrors] = useState({});

    const {handleIsLog} = props; 

    const dispatch = useDispatch(); 
    const history = useHistory(); 

    function runValidations()
    {
        const temp = {};
      
        if(email.trim().length === 0)
        {
            temp.email = 'E-Mail cannot be Empty !'; 
        }
      
        if(password.trim().length === 0)
        {
            temp.password = 'Password cannot be Empty !';
        };

        return temp; 
    };

    function resetForm()
    {
        setEmail('');
        setPassword('');
        handleIsLog();
    };

    function handleChange(event)
    {
        if(event.target.name === 'email')
        {
            setEmail(event.target.value);
        }
        else if(event.target.name === 'password')
        {
            setPassword(event.target.value); 
        }
    };

    function handleSubmit(event)
    {
        event.preventDefault(); 

        const temp = runValidations(); 

        if(Object.keys(temp).length > 0)
        {
            setErrors(temp);
        }
        else
        {
            const inputObj = {
                email, password
            }; 
            dispatch(startAddUser(inputObj, resetForm, history)); 
            setErrors({}); 
        }
    };

    return(
        <div className='container mt-5 md-5 text-center'>
            <h3 className='mb-4'>Login Here!</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group mt-4'>
                    <div className='col-md-5 mx-auto'>
                        <input className='form-control form-control-sm' type='text' name='email' value={email} placeholder='Enter E-Mail...' onChange={handleChange}/>
                        {errors.email && <span className='text-danger' style={{color:'red'}}>{errors.email}</span>}
                    </div>
                </div>
                <div className='form-group mt-4'>
                    <div className='col-md-5 mx-auto'>
                        <input className='form-control form-control-sm' type='password' name='password' value={password} placeholder='Enter your password...' onChange={handleChange}/>
                        {errors.password && <span className='text-danger' style={{color:'red'}}>{errors.password}</span>}
                    </div>
                </div>
                <div className='form-group mt-4'>
                    <input type='submit' value='Log In' className='btn btn-success'/>
                </div>
            </form><br/>
            <Link to='/register'>Haven't Registered ? Register Here !</Link>
        </div>
    );
};

export default Login; 
