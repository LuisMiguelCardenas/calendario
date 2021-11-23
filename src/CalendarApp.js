import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './router/AppRouter'

export const CalendarApp = () => {
    return (
        <Provider store = {store}>
            <AppRouter/>
        </Provider>
    )
}
