import React from 'react'; 
import { useSelector } from 'react-redux';

const CreatorAccount = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.users;
    });

    return(
        <div>
            <h3>Creator Information !</h3>
            {
                user.data && user.data.userId ?
                <h3>Name : {user.data.userId.username}</h3>
                :
                <h3>Loading ....</h3>
            }
            {
                user.data && user.data.userId ?
                <h3>E-Mail : {user.data.userId.email}</h3>
                :
                <h3>Loading ....</h3>
            }
            <h3>Bio : {user.data.bio}</h3>
            <h3>Categories: {user.data.categories}</h3>
            {
                user.data && user.data.socialMedia ? 
                <h3>Social Media Links</h3>
                :
                <h3>Loading...</h3>
            }
            <ul>
                {
                    user.data && user.data.socialMedia ?
                        user.data.socialMedia.facebook ? 
                            <li><h3>Facebook : {user.data.socialMedia.facebook}</h3></li>
                        :
                        <li><h3>Facebook : Not Given.</h3></li>
                    :
                    <></>
                }
                {
                    user.data && user.data.socialMedia ?
                        user.data.socialMedia.twitter ? 
                            <li><h3>Twitter : {user.data.socialMedia.twitter}</h3></li>
                        :
                        <li><h3>Twitter : Not Given.</h3></li>
                    :
                    <></>
                }
                {
                    user.data && user.data.socialMedia ?
                        user.data.socialMedia.instagram ? 
                            <li><h3>Instagram : {user.data.socialMedia.instagram}</h3></li>
                        :
                        <li><h3>Instagram : Not Given.</h3></li>
                    :
                    <></>
                }
                {
                    user.data && user.data.socialMedia ?
                        user.data.socialMedia.youtube ? 
                            <li><h3>Youtube : {user.data.socialMedia.youtube}</h3></li>
                        :
                        <li><h3>Youtube : Not Given.</h3></li>
                    :
                    <></>
                }
            </ul>
            {
                user.data && user.data.followers ?
                <h3>Total Followers: {user.data.followers.length}</h3>
                :
                <h3>Loading...</h3>
            }
        </div>
    );
};

export default CreatorAccount; 
