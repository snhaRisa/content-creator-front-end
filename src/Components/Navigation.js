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
import Profile from './Profile';

const Navigation = (props) => {
    const { isLog, handleIsLog } = props

    const dispatch = useDispatch();

    const user = useSelector((state) => {
        return state.users.data;
    });

    return (
        <div className='container md-5 pd-2'>
            <ul className='nav' style={{ backgroundColor: 'white' }}>
                <li className='nav-item'><Link to='/' className='nav-link' style={{ color: 'brown' }}>Home <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                </svg></Link></li>
                {
                    isLog ?
                        <>
                            {user.bio && <li><Link to='/post-content' className='nav-link' style={{ color: 'brown' }}>Post Content</Link></li>}

                            {user.bio && <li><Link to='/profile' className='nav-link' style={{ color: 'brown' }} >Profile </Link></li>}

                            <li><Link to='/account' className='nav-link' style={{ color: 'brown' }}> Account </Link></li>

                            <li><Link to='/' style={{ color: 'brown' }} onClick={() => {
                                localStorage.removeItem('token');
                                handleIsLog();
                                dispatch(removeUser());
                                Swal.fire('Successfully Logged-Out!');
                            }} className='nav-link'>Logout</Link></li>
                        </>
                        :
                        <>
                            <li><Link to='/register' className='nav-link' style={{ color: 'brown' }}>Register</Link></li>
                            <li><Link to='/login' className='nav-link' style={{ color: 'brown' }}>Log-In</Link></li>
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
            <PrivateRoute path='/content-view/:contentId' component={ContentView} exact={true} />
            <PrivateRoute path='/profile' component={Profile} exact={true} />
        </div>
    );
};

export default Navigation; 