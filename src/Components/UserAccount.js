import React from 'react'; 
import { useSelector } from 'react-redux';
import{Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const UserAccount = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.users; 
    });

    return(
        <div className='container mt-4'>
            <h2>Account Information</h2>
            <div className='card'>
                <div className='card-body ml-2'>
                    <h4>Name : {user.data.username}</h4>
                    <h4>E-Mail : {user.data.email}</h4>
                    <h4>Role: {user.data.role}</h4>
                    {
                        user.data.role === 'user' 
                        && 
                        <div className="alert alert-info" role="alert">
                            Do you want to post contents ? Click on the link below to become a content-creator !<br/>
                            <Link to='/change-to-creator' href="#" className="alert-link">Change To Creator !</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserAccount; 
