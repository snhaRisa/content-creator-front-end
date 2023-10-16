import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

const PaymentButton = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.users.data; 
    });

    const token = localStorage.getItem('token');
    
    async function handleCheckout(contentId)
    {
        try
        {
            const userId = user.userId._id;

            const getDataTemp = await axios.get(`http://localhost:3997/payment-get-data?userId=${userId}&&contentId=${contentId}`);
            const getData = getDataTemp.data; 

            const temp = await axios.post(`http://localhost:3997/payment-checkout`, getData, {headers:{'authorization':token, 'Content-Type': 'application/json'}});
            const result = temp.data; 

            if(result.hasOwnProperty('url'))
            {
                window.location = result.url; 
            }
        }
        catch(err)
        {
            console.log(err);
        };
    };

    return(
        <>
            <button 
                onClick={()=>{handleCheckout('652ce6c041cac4c186dc795a')}}>
                Buy the Subscription.
            </button>
        </>
    );
};

export default PaymentButton; 
