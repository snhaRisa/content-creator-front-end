import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; 
import usersReducer from '../Reducers/usersReducer';
import contentReducer from '../Reducers/contentReducer';
import newContentReducer from '../Reducers/newContentReducer';

const configureStore = ()=>
{
    const store = createStore(combineReducers({
        users: usersReducer,
        content:contentReducer,
        newContent:newContentReducer
    }), applyMiddleware(thunk))

    return store; 
}

export default configureStore; 
