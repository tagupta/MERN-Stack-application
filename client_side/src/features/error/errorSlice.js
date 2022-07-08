import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msg: {},
    status: null,
    id: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        get_errors: (state, action) => {
            console.log('Payload in get error: ', action.payload);
            state.msg = action.payload.msg.msg;
            state.status = action.payload.status;
            state.id = action.payload.id;
        },
        clear_error: (state) => {
            state.msg = {};
            state.status = null;
            state.id = null;
        }
    }
})

export default errorSlice.reducer;
export const { get_errors, clear_error } = errorSlice.actions;