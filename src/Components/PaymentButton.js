import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Swal from 'sweetalert2';

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

    return(
        <>
            <button className='btn btn-dark' //just pass the contentId. 
                onClick={()=>{handleCheckout('6533be0f456802ef9b2f8559')}}>
                Buy the Subscription.
            </button>
        </>
    );
};

export default PaymentButton; 
