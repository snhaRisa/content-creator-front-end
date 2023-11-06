import React, {useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showContent } from '../Actions/allContentsAction';
import "bootstrap/dist/css/bootstrap.min.css";

import SearchHomePage from './SearchHomePage';

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

    function handleProfileView(creatorId)
    {
        //history.push(`/profile-page/${creatorId}`);
    };

    return(
        <div className='container text-center my-5'>
            <h1 style={{color: 'brown', fontSize: '3.5em', fontWeight: 'bold', fontFamily: 'Comic Sans MS'}}>Home - Page</h1>
            <SearchHomePage/>
            <div className='row mt-5'>
                {content.length > 0 ?
                content.map((singleContent) => (
                    <div key={singleContent._id} className='col-lg-3 col-md-4 col-sm-6'>
                        <div className='card mb-3'>
                            <img className='card-img-top' src={singleContent.fileType} style={{height:'180px'}} alt='Image Thumbnail' />
                            <div className='card-body'>
                                <h2 className='card-title'>{singleContent.title.trim().length>10 ? singleContent.title.substring(0,9)+'...' : singleContent.title}</h2>
                                <p className='card-text'>{singleContent.body.trim().length > 15 ? singleContent.body.substring(0,10)+'....' : singleContent.body}</p>
                            </div>
                                <div className="card-footer text-muted">
                                    <span className='badge rounded-pill bg-secondary'>Likes: {singleContent.likes.length}</span>
                                    <span className='badge rounded-pill bg-secondary'>Comments: {singleContent.comments.length}</span>
                                    <span className='badge rounded-pill bg-secondary'>Category: {singleContent.category}</span>
                                </div>
                                <div className="card-footer text-muted">
                                    Posted by <Link to={`/profile-page/${singleContent.creatorId._id}`}><span className="badge rounded-pill bg-dark">{singleContent?.creatorId?.userId?.username}</span></Link> on {String(singleContent.createdAt).substring(0, 10)}
                                </div>
                                <button onClick={() => { handleContentView(singleContent._id) }} className='btn btn-outline-danger mt-3 mx-3 mb-3'>View Content</button>
                        </div>
                    </div>
                ))
                :
                <h2>No Contents Found !</h2>
                }
            </div>
        </div>
    );
};

export default HomePage; 
