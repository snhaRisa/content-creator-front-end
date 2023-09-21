//importing important libraries & packages. 
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {Provider} from 'react-redux'; 
import {BrowserRouter} from 'react-router-dom'; 

//importing required files and configs.
import App from './Components/App';
import configureStore from './Store/configureStore';

//Store configurations
const store = configureStore(); 
console.log(store, store.getState());
store.subscribe(()=>
{
    console.log('After Update', store.getState());
});

//initializing root & rendering it. 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
