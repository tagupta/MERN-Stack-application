import {configureStore} from '@reduxjs/toolkit';
import itemReducer from './features/item/itemSlice';

const store = configureStore({
    reducer:{
        item: itemReducer
    },
    // middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }),
});

export default store;