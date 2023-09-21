import React,{useEffect, useState} from 'react';

import Navigation from './Navigation';

const App = (props)=>
{
    const [isLog, setIsLog] = useState(false); 

    useEffect(()=>
    {
        if(localStorage.getItem('token'))
        {
            setIsLog(true)
        }
    }, []);

    function handleIsLog()
    {
        setIsLog(!isLog);
    };

    return(
        <div>
            <h1>This is Application.</h1>
            <Navigation isLog={isLog} handleIsLog={handleIsLog}/>
        </div>
    );
};

export default App;  
