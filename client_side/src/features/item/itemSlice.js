import { createSlice } from "@reduxjs/toolkit";
import {v1 as uuid} from 'uuid';

const initialState = {
    items : [
        {
            id: uuid(),
            name: 'Eggs'
        },
        {
            id: uuid(),
            name: 'Bananas'
        },
        {
            id: uuid(),
            name: 'Fruits'
        },
        {
            id: uuid(),
            name: 'Milk'
        },
    ],
}
const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers:{
        getItem: (state) => {},
        addItem: (state,action) => {
            state.items = [{id: uuid(),name:action.payload}, ...state.items]
        },
        deleteItem: (state,action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        }
    }
});

export default itemSlice.reducer;
export const {getItem, addItem, deleteItem} = itemSlice.actions;