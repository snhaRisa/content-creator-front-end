import axios from 'axios'; 
import Swal from 'sweetalert2';

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
                Swal.fire('Successfully Registered !');
                history.push('/login'); 
            }
            else
            {
                Swal.fire(result.error);
                resetForm();
            }
        }
        catch(err)
        {
            Swal.fire(err.message);
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
            console.log(result);
            if(result.hasOwnProperty('bio'))
            {
                Swal.fire('You are now a Creator !!');
                resetForm(); 
                history.push('/');
            }
            else
            {
                Swal.fire(result);
            }
        }
        catch(err)
        {
            Swal.fire(err.response);
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully Logged In',
                    showConfirmButton: false,
                    timer: 1500
                });
                resetForm(); 
                history.push('/');
            }
            else
            {
                Swal.fire(result.error); 
            }
        }
        catch(err)
        {
            Swal.fire(err.error);
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
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully Created your Plan!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                resetForm();
                history.push('/account');
            }
            else
            {
                Swal.fire(tempData);
                resetForm();
                history.push('/account');
            }
        }
        catch(err)
        {
            Swal.fire(err.message);
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
