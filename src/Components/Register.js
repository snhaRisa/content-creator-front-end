import React, {useState} from "react";
import validator from 'validator';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

import { startRegisterUser } from "../Actions/usersAction";

const Register = (props)=>
{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch(); 
    const history = useHistory(); 

    function handleChange(event)
    {
        if(event.target.name === 'username')
        {
            setUsername(event.target.value);
        }
        else if(event.target.name === 'email')
        {
            setEmail(event.target.value);
        }
        else if(event.target.name === 'password')
        {
            setPassword(event.target.value);
        }
    };

    function runValidations()
    {
        const temp = {};
        
        if(username.trim().length === 0)
        {
            temp.username = 'UserName cannot be Empty!';
        }
        
        if(!validator.isEmail(email))
        {
            temp.email = 'Invalid E-Mail!';
        }
        else if(email.trim().length === 0)
        {
            temp.email = 'E-Mail cannot be Empty!'; 
        }

        if(password.trim().length === 0)
        {
            temp.password = 'Password cannot be Empty!'; 
        }
        else if(password.trim().length < 8 || password.trim().length > 128)
        {
            temp.password = 'Password must be 8 to 128 characters!'; 
        }

        return temp; 
    }; 

    function resetForm()
    {
        setUsername(''); 
        setEmail(''); 
        setPassword(''); 
    }

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
                username, 
                email,
                password
            };
            dispatch(startRegisterUser(inputObj, resetForm, history));
            setErrors({});
        }
    };

    return (
        <div>
            <h3>Register With Us !</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={username} placeholder="Enter Your User-Name..." onChange={handleChange}/>
                {errors.username && <span style={{color:'red'}}>{errors.username}</span>}<br/><br/>
                <input type="text" name="email" value={email} placeholder="Enter Your E-Mail..." onChange={handleChange}/>
                {errors.email && <span style={{color:'red'}}>{errors.email}</span>}<br/><br/>
                <input type="password" name="password" value={password} placeholder="Enter Your Password..." onChange={handleChange}/>
                {errors.password && <span style={{color:'red'}}>{errors.password}</span>}<br/><br/>
                <input type="submit" value='Register !'/><br/>
            </form>
        </div>
    );
};

export default Register; 
