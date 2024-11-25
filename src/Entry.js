import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { setHeaderToken } from './interceptors/index'
import configureStore from './redux/store';


const Entry = () => {

    useEffect(() => {
        setHeaderToken();
    }, []);


    return (
        <React.StrictMode>
            <Provider store={configureStore}>
                <Router>
                    
                        <App />
                
                </Router>
            </Provider>
        </React.StrictMode>
    )
}

export default Entry;