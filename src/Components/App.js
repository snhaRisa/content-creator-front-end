import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from './Navigation';
import { addUser } from '../Actions/usersAction';

const App = (props)=>
{
    const [isLog, setIsLog] = useState(false); 

    const token = localStorage.getItem('token');

    const dispatch = useDispatch();

    useEffect(()=>
    {
        (async ()=>
        {
            try
            {
                if(token)
                {
                    setIsLog(true);

                    const temp = await axios.get('http://localhost:3997/api/users/account', {headers:{'authorization': token}});
                    const tempResult = temp.data; 

                    if(tempResult.hasOwnProperty('role') && tempResult.role === 'creator')
                    {
                        const tempCreator = await axios.get('http://localhost:3997/api/creator', {headers:{'authorization': token}});
                        const tempCreatorResult = tempCreator.data; 
                        if(tempCreatorResult.hasOwnProperty('bio'))
                        {
                            dispatch(addUser(tempCreatorResult));
                        }
                        else
                        {
                            alert(tempCreatorResult.message);
                        };
                    }
                    else if(tempResult.role === 'user')
                    {
                        dispatch(addUser(tempResult));
                    }
                }
            }
            catch(err)
            {
                alert(err.message);
            }
        })();
    }, [token]);

    function handleIsLog()
    {
        setIsLog(!isLog);
    };

    return(
        <div className="container">
            <div className="text-center">
                <h1 className="display-5 mt-5 mb-5 pd-3" style={{color: 'brown'}}>Content Creation</h1>
            </div>
            <Navigation isLog={isLog} handleIsLog={handleIsLog} />
        </div>
    );
};

export default App;  
