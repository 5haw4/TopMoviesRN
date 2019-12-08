import React from 'react';

import { Provider } from 'react-redux'

import Store from './src/store/reducers/RootReducer'
import MainNavigator from './src/navigation/MainNavigator'

export default function App() {

    return (
        <Provider store={Store}>
            <MainNavigator />
        </Provider>
    );
}
