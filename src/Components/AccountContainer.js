import React from "react";
import {useSelector} from 'react-redux'; 

import UserAccount from './UserAccount';
import CreatorAccount from "./CreatorAccount";

const AccountContainer = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.users; 
    });

    return(
        <div>
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
