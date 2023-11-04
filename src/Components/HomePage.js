import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showContent } from '../Actions/allContentsAction';
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = (props)=>
{
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>
    {
        dispatch(showContent());
    },[]);

    const content = useSelector((state)=>
    {
        return state.content.content;
    });

    function handleContentView(contentId)
    {
        history.push(`/content-view/${contentId}`);
    };

    return(
        <div className='container text-center'>
            <h1>Home - Page</h1>
            {
                content.length > 0 ?
                content.map((singleContent)=>
                {
                    return(
                        <div key={singleContent._id} className='card mt-3 md-3 text-white bg-dark mb-3 border-danger'>
                            <div className='card-body'>
                                <h2 className='card-title'>{singleContent.title}</h2>
                                <p className='card-text'>
                                    {singleContent.body}
                                </p>
                                <span className='badge rounded-pill bg-secondary'>Likes : {singleContent.likes.length}</span>
                                <span className='badge rounded-pill bg-secondary'>Comments : {singleContent.comments.length}</span><br/>
                                <button onClick={()=>{handleContentView(singleContent._id)}} className='btn btn-outline-danger mt-4'>View Content</button>
                            </div>
                        </div>
                    )
                })
                :
                <h2>No Contents Found !</h2>
            }
        </div>
    );
};

export default HomePage; 
