import React, {useEffect} from 'react'; 
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Success = (props)=>
{
    const history = useHistory(); 
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    useEffect(()=>
    {
        (async function successProcess()
        {
            try
            {
                const temp = await axios.get(`http://localhost:3997/payment-session-info?session_id=${sessionId}`, {headers: {'authorization': token}});
                const sessionTemp = temp.data; 

                if(sessionTemp.payment_status === 'paid')
                {
                    const tempObj = {
                        planId: sessionTemp.metadata.planId, 
                        creatorId: sessionTemp.metadata.creatorId, 
                        userId: sessionTemp.metadata.userId, 
                        amount: sessionTemp.metadata.planAmount, 
                        name: sessionTemp.metadata.planName,
                        status: 'completed'
                    }
                    const temp = await axios.put('http://localhost:3997/payment-update-status', tempObj, {headers: {'authorization': token}});

                    const subTemp = await axios.post('http://localhost:3997/api/subscriber', tempObj, {headers: {'authorization': token}});
                    
                    if(subTemp.data === 'Already subscribed!')
                    {
                        alert(subTemp.data);
                        await setTimeout(()=>
                        {
                            history.push('/');
                        }, 3000)
                    }
                    else if(subTemp.data.hasOwnProperty('_id'))
                    {
                        alert('Successfully Subscribed !');
                        await setTimeout(()=>
                        {
                            history.push('/');
                        }, 3000)
                    };
                }
            }
            catch(err)
            {
                alert(err.message);
            }
        })();
    },[]);

    return(
        <>
            <h2>Payment Successful !</h2>
            <p>
                You now have access to the exclusive contents of our websites. These contents are special for the creators, which are handpicked for you. <br/>
            
                Thank You for your valuable time & trust. 
                We hope you enjoy this new journey. <br/><br/>
                <b>You will be redirected to our Home-Page.</b>
            </p>
        </>
    );
};

export default Success;
