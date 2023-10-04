import axios from 'axios'; 

//API call to register a user into the dataBase. 
export const startRegisterUser = (inputObj, resetForm, history)=>
{
    return async (dispatch)=>
    {
        try
        {
            const temp = await axios.post(`http://localhost:3997/api/users/register`, inputObj);
            const result = temp.data; 
            
            if(result.hasOwnProperty('username'))
            {
                resetForm();
                alert('Successfully Registered !');
                history.push('/login'); 
            }
            else
            {
                alert(result.error);
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
        
    }
};

//API call to make a creator; 
export const startRegisterCreator = (inputObj, resetForm, history)=>
{
    return async (dispatch)=>
    {
        try
        {
            const temp = await axios.post(`http://localhost:3997/api/creator`, inputObj, {headers:{'authorization': localStorage.getItem('token')}}); 
            const result = temp.data; 

            if(result.hasOwnProperty('bio'))
            {
                alert('You are now a Creator !!');
                resetForm(); 
                history.push('/');
            }
            else
            {
                alert('Error! Please try again.');
            }
        }
        catch(err)
        {
            alert(err.response);
        };
    };
};

//API call for logging in of a user. 
export const startAddUser = (inputObj, resetForm, history)=>
{
    return (async (dispatch)=>
    {
        try
        {
            const temp = await axios.post(`http://localhost:3997/api/users/login`, inputObj); 
            const result = temp.data; 
            
            if(result.hasOwnProperty('token'))
            {
                localStorage.setItem('token', result.token);
                alert('Successfully Logged In!');  
                resetForm(); 
                history.push('/');
            }
            else
            {
                alert(result.message); 
            }
        }
        catch(err)
        {
            console.log(err.message);
        }
    })
};

//API call for creating subscription plans.
export const startCreatePlan = (inputObj, resetForm, history)=>
{
    return async ()=>
    {
        try
        {
            const temp = await axios.post('http://localhost:3997/api/subscribePlans', inputObj, {headers:{'authorization': localStorage.getItem('token')}}); 
            const tempData = temp.data; 
            if(tempData.hasOwnProperty('_id'))
            {
                alert('Successfully Created your plan!');
                resetForm();
                history.push('/account');
            }
            else
            {
                alert(tempData);
                resetForm();
                history.push('/account');
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
}

//After logged in, the user is added in the store. 
export const addUser = (inputObj)=>
{
    return({
        type: 'ADD_USER', 
        payload: inputObj
    });
};

//remove user after logging out from the store.
export const removeUser = ()=>
{
    return{
        type: "REMOVE_USER", 
    }
};
