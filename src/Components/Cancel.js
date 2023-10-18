import React, {useEffect} from 'react'; 
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Cancel = (props)=>
{
    const history = useHistory(); 
    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    useEffect(()=>
    {
        (async function cancelProcess()
        {
            try
            {
                const temp = await axios.get(`http://localhost:3997/payment-session-info?session_id=${sessionId}`, {headers:{'authorization': token}});
                const sessionTemp = temp.data; 
    
                if(sessionTemp.payment_status === 'unpaid')
                {
                    const tempObj = {
                        planId: sessionTemp.metadata.planId, 
                        creatorId: sessionTemp.metadata.creatorId, 
                        userId: sessionTemp.metadata.userId, 
                        amount: sessionTemp.metadata.planAmount, 
                        name: sessionTemp.metadata.planName,
                        status: 'failed'
                    }
                    const temp = await axios.put('http://localhost:3997/payment-update-status', tempObj, {headers: {'authorization': token}});
                    if(temp.data)
                    {
                        await setTimeout(()=>
                        {
                            history.push('/');
                        }, 5000);
                    };
                }
            }
            catch(err)
            {
                console.log(err.message);
            }
        })();
    }, []);
    
    return(
        <div className='container mt-3 text-center'>
            <h2>Payment Cancelled.</h2>
            <p>
                We are sorry!. We would love you to be a part of our exclusive content viewers. 
                We regret any inconvenience caused.<br/><br/>
                <b>You will be redirected to our Home-Page.</b>
            </p>
        </div>
    );
};

export default Cancel; 
