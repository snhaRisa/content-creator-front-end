import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'; 
import axios from 'axios';

import { addUser } from "../Actions/usersAction";
import UserAccount from './UserAccount';
import CreatorAccount from "./CreatorAccount";
import AdminAccount from "./AdminAccount";

const AccountContainer = (props)=>
{
    const [refresh, setRefresh] = useState(true);
    
    const dispatch = useDispatch(); 
    const user = useSelector((state)=>
    {
        return state.users; 
    });
    
    const token = localStorage.getItem('token');

    useEffect(()=>
    {
        (async ()=>
        {
            if(refresh)
            {
                try
                {
                    const userTemp = await axios.get('http://localhost:3997/api/users/account', {headers:{'authorization': token}});
                    if(userTemp.data.hasOwnProperty('role') && userTemp.data.role === 'creator')
                    {
                        const creatorTemp = await axios.get('http://localhost:3997/api/creator', {headers: {'authorization': token}});
                        if(creatorTemp.data.hasOwnProperty('bio'))
                        {
                            dispatch(addUser(creatorTemp.data));
                            setRefresh(false);
                        }
                    }
                    else if(userTemp.data.hasOwnProperty('role'))
                    {
                        dispatch(addUser(userTemp.data));
                        setRefresh(false);
                    }
                }
                catch(err)
                {
                    alert(err.message);
                }
            }
        })()
    },[refresh])

    return(
        <div>
            {
                user.data.role === 'user' ?
                <UserAccount/>
                :
                user.data.bio ?
                    <CreatorAccount/>
                    :
                    <AdminAccount user={user.data}/>
            }
        </div>
    );
};

export default AccountContainer; 
