import React, {useState} from 'react'; 
import {useDispatch} from 'react-redux'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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
        <div className='container md-5 text-center'>
            <h3 className='mb-4'>Login Here!</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input type='text' name='email' value={email} placeholder='Enter E-Mail...' onChange={handleChange}/><br/>
                    {errors.email && <span style={{color:'red'}}>{errors.email}</span>}<br/><br/>
                </div>
                <div className='form-group'>
                    <input type='password' name='password' value={password} placeholder='Enter your password...' onChange={handleChange}/><br/>
                    {errors.password && <span style={{color:'red'}}>{errors.password}</span>}<br/><br/>
                </div>
                <div className='form-group'>
                    <input type='submit' value='Log In' className='btn btn-secondary'/>
                </div>
            </form>
        </div>
    );
};

export default Login; 
