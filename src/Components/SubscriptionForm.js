import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { startCreatePlan } from '../Actions/usersAction';

const SubscriptionForm = (props)=>
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
            <form onSubmit={handleSubmit}>
                <input type='text' name='planName' value={planName} placeholder='Enter plan name...' onChange={handleChange}/>
                {errors.planName && <span style={{color:'red'}}>{errors.planName}</span>}
                <input type='number' name='planAmount' min={1} value={planAmount} placeholder='Enter amount...' onChange={handleChange}/>
                {errors.planAmount && <span style={{color:'red'}}>{errors.planAmount}</span>}
                <input type='submit' value={'Make your plan'}/>
            </form><br/>
        </div>
    );
};

export default SubscriptionForm; 
