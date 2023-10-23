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

                if(Object.keys(contentReceived).length > 0)
                {
                    setCreator(contentReceived.creator);
                    setSingleContent(contentReceived.content);
                }
                else
                {
                    Swal.fire(contentReceived);
                }

                if(contentReceived.creator)
                {
                    const subTemp = await axios.get(`http://localhost:3997/subscribers/${contentReceived.creator._id}`, {headers:{'authorization':token}});
                    const data = subTemp.data; 
                    if(data.hasOwnProperty('planId'))
                    {
                        setSubscribers(data);
                    }
                    else
                    {
                        Swal.fire('Error getting Subscribers Data !');
                    }
                }
            }
            catch(err)
            {
                Swal.fire(err.message);
            }
        })()
    },[]);

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

    //check if user is subscribed, or the user is the creator. Then check if the content is for subscribers or not. 
    //if isVisible is true you show to subscribers only.
    return(
        <div>
            <div>
                <div>
                    <h6>{ creator && creator.userId && creator.userId.username}</h6>
                </div>
                <h5>{singleContent.title}</h5>
                {
                    singleContent.type === 'image' ? 
                    (
                        <img className="card-img-top" src={singleContent.fileType} alt={singleContent.title} />
                    ) 
                    : 
                    (
                        <video controls width="100%" style={{ height: 'auto' }}>
                            <source src={singleContent.fileType} />
                        </video>
                    )
                }
                <p>
                    {singleContent.body}
                </p>
                <div>
                    <button>Likes : {singleContent && singleContent.likes && singleContent.likes.length}</button>
                    <button>Add Comments</button>
                    <button>Follow Creator</button>
                    <button onClick={()=>{handleCheckout(singleContent._id)}}>Subscribe To Creator</button>
                </div>
            </div>
        </div>
    );
};

export default ContentView; 
