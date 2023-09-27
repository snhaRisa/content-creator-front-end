import React from 'react'; 
import { useSelector } from 'react-redux';
import{Link} from 'react-router-dom';

const UserAccount = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.users; 
    })

    return(
        <div>
            <h2>Account Information</h2>
            <h4>Name : {user.data.username}</h4>
            <h4>E-Mail : {user.data.email}</h4>
            <h4>Role: {user.data.role}</h4>
            {
                user.data.role === 'user' && 
                <p>
                    Do you want to post contents ? Click on the link below to become a content-creator !<br/>
                    <Link to='/change-to-creator'>Change to Creator</Link>
                </p>
            }
        </div>
    );
};

export default UserAccount; 
