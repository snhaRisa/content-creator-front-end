import React from 'react'; 
import {Link, Route} from 'react-router-dom'; 

import Home from './Home';
import Register from './Register';
import Login from './Login';
import AccountInformation from './AccountInformation';
import CreatorForm from './CreatorForm';

import PrivateRoute from './PrivateRoute';

const Navigation = (props)=>
{
    const {isLog, handleIsLog} = props; 

    return(
        <>
            <h2>Navigation</h2>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {
                    isLog ?
                    <>
                        <li><Link to='/account'>Account</Link></li>
                        <li><Link to='/' onClick={()=>
                        {
                            localStorage.removeItem('token');
                            handleIsLog();
                            alert('Successfully Logged-Out!');
                        }}>Logout</Link></li>
                    </>
                    :
                    <>
                        <li><Link to='/register'>Register</Link></li>
                        <li><Link to='/login'>Log-In</Link></li>
                    </>
                }
            </ul>
            <Route path='/' component={Home} exact={true}/>
            <Route path='/register' component={Register} exact={true}/>
            <Route path='/login' render={(props)=>{return <Login {...props} handleIsLog={handleIsLog}/>}} exact={true}/>
            <PrivateRoute path='/account' component={AccountInformation} exact={true}/>
            <PrivateRoute path='/change-to-creator' component={CreatorForm} exact={true}/>
        </>
    );
};

export default Navigation; 
