import React from 'react'; 
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const CreatorAccount = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.users;
    });

    return(
        <div className='container mt-3'>
            <h3>Creator Information !</h3>
                <div className='card'>
                    <div className='card-body'>
                        {
                            user.data && user.data.userId ?
                            <h4>Name : {user.data.userId.username}</h4>
                            :
                            <h4>Loading ....</h4>
                        }
                        
                        {
                            user.data && user.data.userId ?
                            <h4>E-Mail : {user.data.userId.email}</h4>
                            :
                            <h4>Loading ....</h4>
                        }
                        <h4>Bio : <p>{user.data.bio}</p></h4>
                        <h4>Categories: {user.data.categories}</h4>
                        {
                            user.data && user.data.socialMedia ? 
                            <h4>Social Media Links</h4>
                            :
                            <h4>Loading...</h4>
                        }
                        <ul className='list-group'>
                            {
                                user.data && user.data.socialMedia ?
                                    user.data.socialMedia.facebook ? 
                                        <li className='list-group-item'><h5>Facebook : {user.data.socialMedia.facebook}</h5></li>
                                    :
                                    <li className='list-group-item list-group-item-light'><h5>Facebook : Not Given.</h5></li>
                                :
                                <></>
                            }
                            {
                                user.data && user.data.socialMedia ?
                                    user.data.socialMedia.twitter ? 
                                        <li className='list-group-item'><h5>Twitter : {user.data.socialMedia.twitter}</h5></li>
                                    :
                                    <li className='list-group-item list-group-item-light'><h5>Twitter : Not Given.</h5></li>
                                :
                                <></>
                            }
                            {
                                user.data && user.data.socialMedia ?
                                    user.data.socialMedia.instagram ? 
                                        <li className='list-group-item'><h5>Instagram : {user.data.socialMedia.instagram}</h5></li>
                                    :
                                    <li className='list-group-item list-group-item-light'><h5>Instagram : Not Given.</h5></li>
                                :
                                <></>
                            }
                            {
                                user.data && user.data.socialMedia ?
                                    user.data.socialMedia.youtube ? 
                                        <li className='list-group-item'><h5>Youtube : {user.data.socialMedia.youtube}</h5></li>
                                    :
                                    <li className='list-group-item list-group-item-light'><h5>Youtube : Not Given.</h5></li>
                                :
                                <></>
                            }
                        </ul>
                        {
                            user.data && user.data.followers ?
                            <h5>Total Followers: {user.data.followers.length}</h5>
                            :
                            <h5>Loading...</h5>
                        }

                        <div className="alert alert-info" role="alert">
                            <Link to='/create-plans' href="#" className="alert-link">
                                Manage Subscriptions
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default CreatorAccount; 
