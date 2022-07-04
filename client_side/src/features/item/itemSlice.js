import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    items : [],
    loading: false,
    error: ''
}

//Generates pending, fullfilled, rejected
export const fetchItems = createAsyncThunk('item/fetchItems', async(thunkAPI) => {
    const response = await axios.get("/api/items");
    console.log('Get data from backend', response.data);
    return response.data;
    
});

export const addItems = createAsyncThunk('item/addItems', async(item) => {
    const {data} = await axios.post("/api/items",item);
    return data;
})  

export const deleteItems = createAsyncThunk('item/deleteItems', async(id) => {
    const {data} = await axios.delete(`/api/items/${id}`);
    data["id"] = id
    return data;
})


const itemSlice = createSlice({
    name:'item',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchItems.fulfilled, (state,action) => {
            state.loading = false;
            state.items = action.payload;
            state.error= ''
        })
        builder.addCase(fetchItems.rejected , (state,action) => {
            state.loading = false;
            state.items = [];
            state.error = action.error.message;
        })
        builder.addCase(addItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addItems.fulfilled, (state,action) => {
            state.loading = false;
            state.items = [action.payload, ...state.items]
        })
        builder.addCase(addItems.rejected, (state,action) => {
            state.loading = false;
            state.items = [];
            state.error = action.error.message;
        })
        builder.addCase(deleteItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteItems.fulfilled, (state,action) => {
            const { id } = action.payload;
            state.loading = false;
            state.items = state.items.filter(item => item._id !== id);
            state.error = '';
        })
        builder.addCase(deleteItems.rejected, (state,action) => {
            state.loading = false;
            state.items = [];
            state.error = action.error.message;
        })
    }
});

export default itemSlice.reducer;
export const {addItem, deleteItem} = itemSlice.actions;