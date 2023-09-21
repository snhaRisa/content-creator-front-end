import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'; 
import {Link} from 'react-router-dom';
import axios from 'axios'; 

import {addUser} from '../Actions/usersAction';

const AccountInformation = (props)=>
{
    const dispatch = useDispatch();
    
    const userObj = useSelector((state)=>
    {
        return state.users; 
    });

    useEffect(()=>
    {
        (async ()=>
        {
            try
            {
                if(!userObj.data.username)
                {
                    const tempAccount = await axios.get(`http://localhost:3997/api/users/account`, {headers:{'x-auth':localStorage.getItem('token')}});
                    const accountDetails = tempAccount.data; 
                    if(accountDetails.hasOwnProperty('username'))
                    {
                        dispatch(addUser(accountDetails));
                    }
                    else
                    {
                        alert(accountDetails.message); 
                    }
                }
            }
            catch(err)
            {
                alert(err.message);
            }
        })()
    }, [])

    return(
        <div>
            <h2>Account Information</h2>
            <h4>Name : {userObj.data.username}</h4>
            <h4>E-Mail : {userObj.data.email}</h4>
            <h4>Role: {userObj.data.role}</h4>
            <p>
                Do you want to post contents ? Click on the link below to become a content-creator !<br/>
                <Link to='/change-to-creator'>Change to Creator</Link>
            </p>
        </div>
    );
};

export default AccountInformation; 
