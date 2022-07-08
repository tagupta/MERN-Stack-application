import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { get_errors, clear_error } from "../error/errorSlice";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

//Check token and load user
export const loadUser = createAsyncThunk('auth/loadUser', async (arg, { getState, rejectWithValue, dispatch }) => {

    return axios.get('/api/auth/user', tokenConfig(getState))
        .then(response => response.data)
        .catch(error => {
            dispatch(get_errors({ msg: error.response.data, status: error.response.status, id: null }));
            return rejectWithValue({
                data: error.response.data,
                status: error.response.status
            })

        });
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login_success: (state, action) => {
            console.log('Login Success', action.payload);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        register_success: (state, action) => {
            console.log('Register Success', action.payload);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        login_fail: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        logout_success: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        register_fail: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(loadUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        })
        builder.addCase(loadUser.rejected, (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        })
    }
})

export const tokenConfig = (getState) => {
    //Get token from local storage
    const token = getState().token;
    // Set Header for http request
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

export default authSlice.reducer;
export const { login_success, register_success,
    login_fail, logout_success, register_fail } = authSlice.actions;