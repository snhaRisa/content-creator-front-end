import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';

import { removeUser } from '../Actions/usersAction';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';
import AccountContainer from './AccountContainer';
import CreatorForm from './CreatorForm';
import PostContentForm from './PostContentForm';
import SubscriptionPlan from './SubscriptionPlan';
import Success from './Success';
import Cancel from './Cancel';
import ContentView from './ContentView';
import PrivateRoute from './PrivateRoute';

const Navigation = (props) => 
{
    const { isLog, handleIsLog } = props

    const dispatch = useDispatch();
    
    const user = useSelector((state)=>
    {
        return state.users.data;
    });

    return (
        <div className='container md-5 pd-2'>
            <ul className='nav' style={{ color:'black', backgroundColor: 'WhiteSmoke', fontSize: '1.5em', fontWeight: 'bold', fontFamily: 'Arial, sans-serif'}}>
                <li className='nav-item'><Link to='/' className='nav-link' style={{ color: 'Teal' }}>Home</Link></li>
                {
                    isLog ?
                        <>
                            {user.bio && <li><Link to='/post-content' className='nav-link' style={{ color: 'Teal' }}>Post Content</Link></li>}
                            <li><Link to='/account' className='nav-link' style={{ color: 'Teal' }}>Account</Link></li>
                            <li><Link to='/' style={{ color: 'Teal' }} onClick={() => {
                                localStorage.removeItem('token');
                                handleIsLog();
                                dispatch(removeUser());
                                Swal.fire('Successfully Logged-Out!');
                            }} className='nav-link'>Logout</Link></li>
                        </>
                        :
                        <>
                            <li><Link to='/register' className='nav-link' style={{ color: 'Teal' }}>Register</Link></li>
                            <li><Link to='/login' className='nav-link' style={{ color: 'Teal' }}>Log-In</Link></li>
                        </>
                }
            </ul>
            <Route path='/' component={HomePage} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            <Route path='/login' render={(props) => { return <Login {...props} handleIsLog={handleIsLog} /> }} exact={true} />
            <PrivateRoute path='/account' component={AccountContainer} exact={true} />
            <PrivateRoute path='/change-to-creator' component={CreatorForm} exact={true} />
            <PrivateRoute path='/create-plans' component={SubscriptionPlan} exact={true} />
            <PrivateRoute path='/success' component={Success} exact={true} />
            <PrivateRoute path='/cancel' component={Cancel} exact={true} />
            <PrivateRoute path='/post-content' component={PostContentForm} exact={true} />
            <PrivateRoute path='/content-view/:contentId' component={ContentView} exact={true}/>
            {/* <PrivateRoute path='/profile-page/:creatorId' component={} exact={true}/> //add creator Profile page here. */}
        </div>
    );
};

export default Navigation; 
