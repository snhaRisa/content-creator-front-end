
const users = {
    data: {}, 
    errors: {}, 
    isLoading: false
};

const usersReducer = (state=users, action)=>
{
    switch(action.type)
    {
        case "ADD_USER":{
            return {...state, data: action.payload}
        }
        default:{
            return {...state}
        }
    }
};

export default usersReducer; 
