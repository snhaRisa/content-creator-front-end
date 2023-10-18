import React from 'react'; 
import {Link, Route} from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

import { removeUser } from '../Actions/usersAction';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AccountContainer from './AccountContainer';
import CreatorForm from './CreatorForm';
import SubscriptionPlan from './SubscriptionPlan';
import Success from './Success';
import Cancel from './Cancel';

import PrivateRoute from './PrivateRoute';

const Navigation = (props)=>
{
    const {isLog, handleIsLog} = props; 
    const dispatch = useDispatch(); 


    return(
        <div className='container md-5 pd-2'>
            <ul className='nav' style={{backgroundColor:'white'}}>
                <li className='nav-item'><Link to='/' className='nav-link' style={{color:'brown'}}>Home</Link></li>
                {
                    isLog ?
                    <>
                        <li><Link to='/account' className='nav-link' style={{color:'brown'}}>Account</Link></li>
                        <li><Link to='/' style={{color:'brown'}} onClick={()=>
                        {
                            localStorage.removeItem('token');
                            handleIsLog();
                            dispatch(removeUser());
                            Swal.fire('Successfully Logged-Out!');
                        }} className='nav-link'>Logout</Link></li>
                    </>
                    :
                    <>
                        <li><Link to='/register' className='nav-link' style={{color:'brown'}}>Register</Link></li>
                        <li><Link to='/login' className='nav-link' style={{color:'brown'}}>Log-In</Link></li>
                    </>
                }
            </ul>
            <Route path='/' component={Home} exact={true}/>
            <Route path='/register' component={Register} exact={true}/>
            <Route path='/login' render={(props)=>{return <Login {...props} handleIsLog={handleIsLog}/>}} exact={true}/>
            <PrivateRoute path='/account' component={AccountContainer} exact={true}/>
            <PrivateRoute path='/change-to-creator' component={CreatorForm} exact={true}/>
            <PrivateRoute path='/create-plans' component={SubscriptionPlan} exact={true}/>
            <PrivateRoute path='/success' component={Success} exact={true}/>
            <PrivateRoute path='/cancel' component={Cancel} exact={true}/>
        </div>
    );
};

export default Navigation; 
