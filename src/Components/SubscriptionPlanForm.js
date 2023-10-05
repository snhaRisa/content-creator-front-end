import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {Link} from 'react-router-dom';

import { startCreatePlan } from '../Actions/usersAction';

const SubscriptionPlanForm = (props)=>
{
    const [planName, setPlanName] = useState('');
    const [planAmount, setPlanAmount] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch(); 
    const history = useHistory(); 

    const user = useSelector((state)=>
    {
        return state.users.data; 
    });

    function resetForm()
    {
        setPlanAmount('');
        setPlanName('');
    }

    function runValidations()
    {
        const temp = {}; 

        if(planName.trim().length === 0)
        {
            temp.planName = 'Plan Name cannot be blank !';
        }
        if(planAmount.length === 0)
        {
            temp.planAmount = 'Amount cannot be blank !';
        }

        return temp; 
    };

    function handleChange(event)
    {
        const {name, value} = event.target;

        if(name === 'planName')
        {
            setPlanName(value);
        }
        else if(name === 'planAmount')
        {
            setPlanAmount(value);
        }
    };

    function handleSubmit(event)
    {
        event.preventDefault(); 

        const temp = runValidations(); 

        if(Object.keys(temp).length > 0)
        {
            setErrors(temp);
        }
        else
        {
            setErrors({});
            const tempObj = {
                name: planName, 
                amount: Number(planAmount), 
                creatorId: user._id
            };
            dispatch(startCreatePlan(tempObj, resetForm, history));
        }
    }

    return(
        <div>
            <h2>Manage Your Subscriptions</h2>
            <p>
                Welcome - Simplify Your Subscription Management! Manage, renew, and optimize all your subscriptions in one place.<br/>
                You can create <b>one plan</b> for the viewers who love your content & are happy to support you. <br/>
                Create custom made content for them & provide yourself an income ! 
            </p>
            <form onSubmit={handleSubmit}>
                <input type='text' name='planName' value={planName} placeholder='Enter plan name...' onChange={handleChange}/>
                {errors.planName && <span style={{color:'red'}}>{errors.planName}</span>}
                <input type='number' name='planAmount' min={1} value={planAmount} placeholder='Enter amount...' onChange={handleChange}/>
                {errors.planAmount && <span style={{color:'red'}}>{errors.planAmount}</span>}
                <input type='submit' value={'Make your plan'}/>
            </form><br/>
            <Link to='/account'>Back to Dashboard</Link>
        </div>
    );
};

export default SubscriptionPlanForm; 
