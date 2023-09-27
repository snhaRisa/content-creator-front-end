
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
        case "REMOVE_USER":{
            return {...state, data: {}}
        }
        default:{
            return {...state}
        }
    }
};

export default usersReducer; 
