import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { removeUser } from '../Actions/usersAction';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import AccountContainer from './AccountContainer';
import CreatorForm from './CreatorForm';
import CreateContent from './CreateContent'
import PrivateRoute from './PrivateRoute';
import NewContent from './CreateContent'
import { createContent } from '../Actions/newContentAction';
const Navigation = (props) => {
    const { isLog, handleIsLog } = props;
    const dispatch = useDispatch();

    return (
        <>
            <h2>Navigation</h2>
            <ul>
                {
                    isLog ?
                        <>
                            <li><Link to='/account'>Account</Link></li>
                            <li><Link to='/' onClick={() => {
                                localStorage.removeItem('token');
                                handleIsLog();
                                dispatch(removeUser());
                                alert('Successfully Logged-Out!');
                            }}>Logout</Link></li>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/create'>Create Post</Link></li>
                        </>
                        :
                        <>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Log-In</Link></li>
                        </>
                }
            </ul>
            <Route path='/' component={Home} exact={true} />
            <Route path='/register' component={Register} exact={true} />
            <Route path='/login' render={(props) => { return <Login {...props} handleIsLog={handleIsLog} /> }} exact={true} />
            <PrivateRoute path='/account' component={AccountContainer} exact={true} />
            <PrivateRoute path='/change-to-creator' component={CreatorForm} exact={true} />
            <PrivateRoute path='/create' component={CreateContent} exact={true} />
        </>
    );
};

export default Navigation; 