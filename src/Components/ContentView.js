import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

const ContentView = (props)=>
{
    const {contentId} = useParams();
    const token = localStorage.getItem('token');
    const [singleContent, setSingleContent] = useState({});
    const [creator, setCreator] = useState({});
    const [subscribers, setSubscribers] = useState([]);
    //Important states for rendering.
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isExclusive, setIsExclusive] = useState(false);
    const [isSame, setIsSame] = useState(false);
    const [showComments, setShowComments] = useState(false);
    //Button states.
    const [isFollower, setIsFollower] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isComment, setIsComment] = useState(false);

    const user = useSelector((state)=>
    {
        return state.users.data; 
    });

    useEffect(()=>
    {
        (async function()
        {
            try
            {
                const contentTemp = await axios.get(`http://localhost:3997/content/${contentId}`, {headers:{'authorization': token}});
                const contentReceived = contentTemp.data; 
                const subTemp = await axios.get(`http://localhost:3997/subscribers/${contentReceived.creator._id}`, {headers:{'authorization':token}});
                const data = subTemp.data; 

                if(Object.keys(contentReceived).length > 0)
                {
                    setCreator(contentReceived.creator);
                    setSingleContent(contentReceived.content);
                }
                else
                {
                    Swal.fire(contentReceived);
                }
                
                if(data)
                {
                    setSubscribers(data);
                }
                else
                {
                    Swal.fire('Error getting Subscribers Data !');
                }
            }
            catch(err)
            {
                Swal.fire(err.message);
            }
        })()
    },[]);

    useEffect(()=>
    {
        if(Object.keys(subscribers).length > 0 && Object.keys(user).length > 0 && Object.keys(singleContent).length>0)
        {
            //Checking if the content is exclusive in nature. 
            const tempContent = singleContent.isVisible;
            // console.log(tempContent, 'it is for subscribers');
            setIsExclusive(tempContent);
            
            //checking if the user is subscribed to the creator to watch his exclusive content. 
            const tempSubscribed = subscribers.subscribers.find((ele)=>
            {
                return ele.userId === user._id;
            })
            if(tempSubscribed)
            {
                setIsSubscribed(true);
                // console.log('Is subscribed')
            }
            else
            {
                setIsSubscribed(false);
                // console.log('not subscribed')
            }
            
            //checking if the user is the creator itself. 
            if(creator._id === user._id)
            {
                setIsSame(true);
                // console.log(true, 'same creator and user')
            }
            else
            {
                setIsSame(false);
                // console.log('false', 'not same creator and user');
            }

            //Checking if the user is creator's follower. 
            const tempFollow = creator.followers.find((ele)=>
            {
                return ele.userId === user._id; 
            });
            if(tempFollow)
            {
                setIsFollower(true);
            }
            else
            {
                setIsFollower(false);
            }

            //Checking if the user liked the creator's content. 
            const tempLiked = singleContent.likes.find((ele)=>
            {
                return ele.userId === user._id; 
            });
            
            if(tempLiked)
            {
                setIsLiked(true);
            }
            else
            {
                setIsLiked(false);
            }

            //Checking if the user has commented for the remove button.
            const commentTemp = singleContent.comments.find((ele)=>
            {
                return ele.userId === user._id;
            })
            if(commentTemp)
            {
                setIsComment(true)
            }
            else
            {
                setIsComment(false);
            }
        }
    },[subscribers, creator, singleContent, user]);

    async function handleCheckout(contentId)
    {
        try
        {
            const userId = user._id || user.userId._id 
            const getDataTemp = await axios.get(`http://localhost:3997/payment-get-data?userId=${userId}&&contentId=${contentId}`);
            const getData = getDataTemp.data; 

            if(getData === "Error while finding the Plan!")
            {
                Swal.fire(getData);
            }
            else
            {
                const temp = await axios.post(`http://localhost:3997/payment-checkout`, getData, {headers:{'authorization':token, 'Content-Type': 'application/json'}});
                const result = temp.data; 

                if(result.hasOwnProperty('url'))
                {
                    window.location = result.url; 
                }
                else
                {
                    Swal.fire(result);
                }
            }
        }
        catch(err)
        {
            console.log(err);
        };
    };

    async function handleFollow(userId, creatorId)
    {
        try
        {
            const temp = await axios.post(`http://localhost:3997/api/creator/follow`, {userId, creatorId});
            if(temp.data.hasOwnProperty('bio'))
            {
                setCreator(temp.data);
            }
            else
            {
                Swal.fire('You already follow the creator!');
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
    };

    async function handleUnFollow(userId, creatorId)
    {
        try
        {
            const temp = await axios.post(`http://localhost:3997/api/creator/unfollow`, {userId, creatorId});
            if(temp.data.hasOwnProperty('bio'))
            {
                setCreator(temp.data);
            }
            else
            {
                Swal.fire('You are not following the creator!');
            }
        }
        catch(err)
        {
            Swal.fire('Error while Un-Following the Creator !');
        }
    };

    async function handleLike(userId, postId)
    {
        try
        {
            const tempLike = await axios.put(`http://localhost:3997/api/post/like`, {userId, postId}, {headers:{'authorization':token}});
            if(tempLike.data.hasOwnProperty('content'))
            {
                setSingleContent(tempLike.data.content);
            }
        }
        catch(err)
        {
            Swal.fire(err.message);
        }
    };

    async function handleUnLike(userId, postId)
    {
        try
        {
            const tempLiked = await axios.put(`http://localhost:3997/api/post/unlike`, {userId, postId}, {headers:{'authorization':token}});
            if(tempLiked.data.hasOwnProperty('post'))
            {
                setSingleContent(tempLiked.data.post);
            }
        }
        catch(err)
        {
            Swal.fire(err.message)
        }
    };

    async function handleAddComment(userId, contentId)
    {
        try
        {
            const { value: text } = await Swal.fire({
                input: 'textarea',
                inputLabel: 'Add your Comment...',
                inputPlaceholder: 'Type your comment here...',
                inputAttributes: {
                    'aria-label': 'Type your comment here'
                },
                showCancelButton: true
            })

            if(text) 
            {
                const temp = await axios.post(`http://localhost:3997/api/comments`, {body:text, contentId, userId}, {headers:{'authorization': token}});
                await Swal.fire(text);
                if(temp.data.hasOwnProperty('content'))
                {
                    setSingleContent(temp.data.content);
                }
            }
        }
        catch(err)
        {
            Swal.fire(err.message);
        }
    };

    async function handleRemoveComment(commentId, contentId)
    {
        try
        {
            const temp = await axios.delete(`http://localhost:3997/api/comments/${contentId}/${commentId}`, {headers:{'authorization':token}});
            if(temp.data.hasOwnProperty('updatedContent'))
            {
                setSingleContent(temp.data.updatedContent);
            }
        }
        catch(err)
        {
            Swal.fire(err.message);
        }
    };

    //check if user is subscribed, or the user is the creator. Then check if the content is for subscribers or not. 
    //if isVisible is true you show to subscribers only.
    return(
        <div>
            {
                !isExclusive ?
                    <div>
                        <h3>{singleContent.title}</h3>
                        <p>
                            {singleContent.body}
                            All can see the Content
                        </p>
                        {singleContent.type === 'image' ? 
                        (
                            <img className="card-img-top" style={{width:'400px', height: '400px'}} src={singleContent.fileType} alt={singleContent.title} />
                        ) 
                        : 
                        (
                            <video controls width="100%" style={{ height: 'auto' }}>
                                <source src={singleContent.fileType} />
                            </video>
                        )}
                        <div>
                            {
                                isLiked ?
                                    <button onClick={()=>{handleUnLike(user._id, singleContent._id)}}>Un-Like : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                                    :
                                    <button onClick={()=>{handleLike(user._id, singleContent._id)}}>Like : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                            }
                            <button onClick={()=>{handleAddComment(user._id, singleContent._id)}}>Add Comment</button>
                            {
                                isFollower ?
                                    <button onClick={()=>{handleUnFollow(user._id, creator._id)}} style={{color:'red'}}>Un-follow Creator</button>
                                    :
                                    <button onClick={()=>{handleFollow(user._id, creator._id)}}>Follow Creator</button>
                            }
                            {
                                isSubscribed ?
                                    <button disabled={true}>Subscribed</button>
                                    :
                                    <button onClick={()=>{handleCheckout(singleContent._id)}}>Subscribe To Creator</button>
                            }
                        </div><br/>
                        <div>
                            <button disabled={singleContent && singleContent.comments && singleContent.comments.length === 0} onClick={()=>{setShowComments(!showComments)}}>Show Comments</button>
                            {
                                showComments 
                                &&
                                <ul>
                                    {
                                        singleContent.comments.map((comment)=>
                                        {
                                            return <li key={comment._id}>
                                                        {comment.body}
                                                        {
                                                            isComment && <button onClick={()=>{handleRemoveComment(comment._id, singleContent._id)}}>Remove Comment</button>
                                                        }
                                                    </li>
                                        })
                                    }
                                </ul> 
                            }
                        </div>
                    </div>
                    :
                    isSubscribed || isSame ?
                        <div>
                        <h3>{singleContent.title}</h3>
                        <p>
                            {singleContent.body}
                            exclusive content.
                        </p>
                        {singleContent.type === 'image' ? 
                        (
                            <img className="card-img-top" style={{width:'400px', height: '400px'}} src={singleContent.fileType} alt={singleContent.title} />
                        ) 
                        : 
                        (
                            <video controls width="100%" style={{ height: 'auto' }}>
                                <source src={singleContent.fileType} />
                            </video>
                        )}
                        <div>
                            {
                                isLiked ?
                                    <button onClick={()=>{handleUnLike(user._id, singleContent._id)}}>Un-Like : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                                    :
                                    <button onClick={()=>{handleLike(user._id, singleContent._id)}}>Like : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                            }
                            <button onClick={()=>{handleAddComment(user._id, singleContent._id)}}>Add Comment</button>
                            {
                                isFollower ?
                                    <button onClick={()=>{handleUnFollow(user._id, creator._id)}} style={{color:'red'}}>Un-follow Creator</button>
                                    :
                                    <button onClick={()=>{handleFollow(user._id, creator._id)}}>Follow Creator</button>
                            }
                            {
                                isSubscribed ?
                                    <button disabled={true}>Subscribed</button>
                                    :
                                    <button onClick={()=>{handleCheckout(singleContent._id)}}>Subscribe To Creator</button>
                            }
                        </div><br/>
                        <div>
                            <button disabled={singleContent && singleContent.comments && singleContent.comments.length === 0} onClick={()=>{setShowComments(!showComments)}}>Show Comments</button>
                            {
                                showComments 
                                &&
                                <ul>
                                    {
                                        singleContent.comments.map((comment)=>
                                        {
                                            return <li key={comment._id}>
                                                        {comment.body}
                                                        {
                                                            isComment && <button onClick={()=>{handleRemoveComment(comment._id, singleContent._id)}}>Remove Comment</button>
                                                        }
                                                    </li>
                                        })
                                    }
                                </ul> 
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <h3>{singleContent.title}</h3>
                        <p>
                            {singleContent.body}
                            Subscribe to see the content.
                        </p>
                        <div>
                            {
                                isLiked ?
                                    <button onClick={()=>{handleUnLike(user._id, singleContent._id)}}>Un-Like : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                                    :
                                    <button onClick={()=>{handleLike(user._id, singleContent._id)}}>Like : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                            }
                            <button onClick={()=>{handleAddComment(user._id, singleContent._id)}}>Add Comment</button>
                            {
                                isFollower ?
                                    <button onClick={()=>{handleUnFollow(user._id, creator._id)}} style={{color:'red'}}>Un-follow Creator</button>
                                    :
                                    <button onClick={()=>{handleFollow(user._id, creator._id)}}>Follow Creator</button>
                            }
                            {
                                isSubscribed ?
                                    <button disabled={true}>Subscribed</button>
                                    :
                                    <button onClick={()=>{handleCheckout(singleContent._id)}}>Subscribe To Creator</button>
                            }
                        </div><br/>
                        <div>
                            <button disabled={singleContent && singleContent.comments && singleContent.comments.length === 0} onClick={()=>{setShowComments(!showComments)}}>Show Comments</button>
                            {
                                showComments 
                                &&
                                <ul>
                                    {
                                        singleContent.comments.map((comment)=>
                                        {
                                            return <li key={comment._id}>
                                                        {comment.body}
                                                        {
                                                            isComment && <button onClick={()=>{handleRemoveComment(comment._id, singleContent._id)}}>Remove Comment</button>
                                                        }
                                                    </li>
                                        })
                                    }
                                </ul> 
                            }
                        </div>
                    </div>
            }
        </div>
    );
};

export default ContentView; 
