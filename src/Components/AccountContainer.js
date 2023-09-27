import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'; 
import axios from 'axios'; 

import {addUser} from '../Actions/usersAction';
import UserAccount from './UserAccount';
import CreatorAccount from "./CreatorAccount";

const AccountContainer = (props)=>
{
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');

    const [refresh, setRefresh] = useState(true); 

    const user = useSelector((state)=>
    {
        return state.users; 
    });

    useEffect(()=>
    {
        (async ()=>
        {
            if(refresh)
            {   
                try
                {
                    const tempDoc = await axios.get(`http://localhost:3997/api/users/account`, {headers:{'authorization':token}});
                    const result = tempDoc.data; 
                    if(result.hasOwnProperty('role') && result.role === 'creator')
                    {
                        const tempCreator = await axios.get(`http://localhost:3997/api/creator`, {headers:{'authorization': token}});
                        if(tempCreator.data.hasOwnProperty('bio'))
                        {
                            dispatch(addUser(tempCreator.data));
                            setRefresh(false);
                        }
                    }
                    else if(result.hasOwnProperty('username') && result.role === 'user')
                    {
                        dispatch(addUser(result));
                        setRefresh(false);
                    }
                }
                catch(err)
                {
                    alert(err.message);
                }
            }
        })();
    },[refresh]);

    return(
        <div>
            <h2>Work In Progress !</h2>
            {
                user.data.role === 'user' ?
                <UserAccount/>
                :
                <CreatorAccount/>
            }
        </div>
    );
};

export default AccountContainer; 
