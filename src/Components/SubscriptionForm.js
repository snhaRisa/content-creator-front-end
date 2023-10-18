import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className='container mt-2'>
            <form className='form-group' onSubmit={handleSubmit}>
                <div className='form-group-item'>
                <input type='text' name='planName' value={planName} placeholder='Enter plan name...' onChange={handleChange}/><br/>
                {errors.planName && <span style={{color:'red'}}>{errors.planName}</span>}<br/><br/>
                </div>
                <div className='form-group-item'>
                <input type='number' name='planAmount' min={1} value={planAmount} placeholder='Enter amount...' onChange={handleChange}/><br/>
                {errors.planAmount && <span style={{color:'red'}}>{errors.planAmount}</span>}<br/>
                </div>
                <div className='form-group-item'>
                <input className='btn btn-secondary' type='submit' value={'Make your plan'}/>
                </div>
            </form><br/>
        </div>
    );
};

export default SubscriptionForm; 
