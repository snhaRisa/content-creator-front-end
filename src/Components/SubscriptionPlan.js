import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";

import SubscriptionForm from './SubscriptionForm';

//Add edit, delete function to subs pack. 
const SubscriptionPlan = (props)=>
{ 
    const [plan, setPlan] = useState({});
    const [subscribers, setSubscribers] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const token = localStorage.getItem('token');

    const user = useSelector((state)=>
    {
        return state.users.data;
    });

    useEffect(()=>
    {
        if(refresh)
        {
            (async ()=>
            {
                try
                {
                    const planTemp = await axios.get(`http://localhost:3997/api/subscriptionPlans`, {headers: {'authorization':token}});
                    const subscriberTemp = await axios.get(`http://localhost:3997/api/subscribers`, {headers:{'authorization': token}});

                    const resultTemp = planTemp.data; 
                    if(resultTemp)
                    {
                        setPlan(resultTemp);
                    }

                    const resultSubscriber = subscriberTemp.data;
                    if(resultSubscriber)
                    {
                        setSubscribers(resultSubscriber);
                        setRefresh(false);
                    }
                }
                catch(err)
                {
                    console.log(err.message);
                };
            })()
        }
    }, [refresh])

    async function handleDelete(inputId)
    {
        try
        {
            const check = Swal.fire('Are You Sure ?');
            if(check)
            {
                const temp = await axios.delete(`http://localhost:3997/api/subscription-plans/${inputId}`, {headers:{'authorization': token}});
                const resultTemp = temp.data; 
                if(resultTemp._id === inputId)
                {
                    Swal.fire('Successfully Deleted your plan !');
                    setPlan({});
                }
                else
                {
                    Swal.fire('Error while deleting your plan. Please try again later !');
                }
            }
            else
            {
                Swal.fire('You Pack is Safe !');
            }
        }
        catch(err)
        {
            console.log(err);
        }
        
    }

    async function handleEdit(inputId)
    {
        try
        {
            var amount; 
            const { value: name } = await Swal.fire({
                title: 'Input New Pack Name',
                input: 'text',
                inputLabel: 'Your Pack Name',
                inputPlaceholder: 'Enter your Pack Name'
            });

            if(name && name.length > 0)
            {
                var amount = await Swal.fire({
                    title: 'Input New Amount',
                    input: 'number',
                    inputLabel: 'Your New Amount',
                    inputPlaceholder: 'Enter your Pack Amount'
                });   
                amount = amount.value;    
            }
            else
            {
                Swal.fire('Name cannot be empty!')   
            }   

            
            if(name && amount)
            {
                const temp = await axios.put(`http://localhost:3997/api/subscription/update/${inputId}`, {name: name, amount: amount}, {headers: {'authorization': token}});
                const result = temp.data; 
                if(result.hasOwnProperty('name'))
                {
                    setPlan(result);
                }
                else
                {
                    Swal.fire('Error while updating the plan! Please try later.');
                }
            }
        }
        catch(err)
        {
            Swal.fire('Error while updating, please try later!');
        }
    }

    return(
        <div className='container text-center'>
            <h2>Manage Your Subscriptions</h2>
            <p>
                Welcome - Simplify Your Subscription Management! Manage, renew, and optimize all your subscriptions in one place.
            </p>
            {
                plan.amount ? 
                <p>
                    You have created one plan. Here are the details of your subscription plan.<br/><br/>
                    <em>Plan Name</em> : <b>{plan.name}</b><br/>
                    <em>Plan Amount</em> : <b>{plan.amount}</b><br/><br/>
                    <button className='btn btn-dark' onClick={()=>{handleDelete(plan._id)}}>Delete Your Pack</button>
                    <button className='btn btn-secondary' onClick={()=>{handleEdit(plan._id)}}>Edit your Pack</button><br/><br/>
                    {
                        subscribers.length > 0 ?
                        <>
                            <em>Total Subscribers : <b>{subscribers.length}</b></em><br/>
                            <em>Total Income : <b>{subscribers.length * plan.amount}</b></em>
                        </>
                        :
                        <>
                            <b>Currently, you have no subscriber !</b><br/>
                            But Chin Up ! Create Content and People will come follow you soon.
                        </>
                    }
                </p>
                :
                <>
                    <p>
                        You can create <b>one plan</b> for the viewers who love your content & are happy to support you. <br/>
                        Create custom made content for them & provide yourself an income ! 
                    </p>
                    <SubscriptionForm/>
                </>
            }
            <Link to='/account'>Back to Dashboard</Link>
        </div>
    );
};

export default SubscriptionPlan; 
