import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { tokenConfig } from "../auth/authSlice";
import { get_errors } from '../error/errorSlice';

const initialState = {
    items: [],
    loading: false,
    error: ''
}

//Generates pending, fullfilled, rejected
export const fetchItems = createAsyncThunk('item/fetchItems', async (arg, { rejectWithValue, dispatch }) => {

    return axios.get('/api/items')
        .then(response => response.data)
        .catch(error => {
            dispatch(get_errors({ msg: error.response.data, status: error.response.status, id: null }));
            return rejectWithValue(error);
        });
});

export const addItems = createAsyncThunk('item/addItems', async (item, { getState, rejectWithValue, dispatch }) => {

    return axios.post('/api/items', item, tokenConfig(getState))
        .then(response => response.data)
        .catch(error => {
            dispatch(get_errors({ msg: error.response.data, status: error.response.status, id: null }));
            return rejectWithValue(error);
        });
})

export const deleteItems = createAsyncThunk('item/deleteItems', async (id, { getState, rejectWithValue, dispatch }) => {
    const config = tokenConfig(getState);
    return axios.delete(`/api/items/${id}`, config)
        .then(response => {
            response.data["id"] = id;
            return response.data;
        })
        .catch(error => {
            dispatch(get_errors({ msg: error.response.data, status: error.response.status, id: null }));
            return rejectWithValue(error);
        });
})


const itemSlice = createSlice({
    name: 'item',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.error = ''
        })
        builder.addCase(fetchItems.rejected, (state, action) => {
            state.loading = false;
            state.items = [];
            state.error = action.error.message;
        })
        builder.addCase(addItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addItems.fulfilled, (state, action) => {
            state.loading = false;
            state.items = [action.payload, ...state.items]
        })
        builder.addCase(addItems.rejected, (state, action) => {
            state.loading = false;
            state.items = [];
            state.error = action.error.message;
        })
        builder.addCase(deleteItems.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteItems.fulfilled, (state, action) => {
            const { id } = action.payload;
            state.loading = false;
            state.items = state.items.filter(item => item._id !== id);
            state.error = '';
        })
        builder.addCase(deleteItems.rejected, (state, action) => {
            state.loading = false;
            state.items = [];
            state.error = action.error.message;
        })
    }
});

export default itemSlice.reducer;
export const { addItem, deleteItem } = itemSlice.actions;