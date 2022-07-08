import {configureStore} from '@reduxjs/toolkit';
import itemReducer from './features/item/itemSlice';
import authReducer from './features/auth/authSlice';
import errorReducer from './features/error/errorSlice';

const store = configureStore({
    reducer:{
        item: itemReducer,
        auth: authReducer,
        error: errorReducer
    },
});

export default store;