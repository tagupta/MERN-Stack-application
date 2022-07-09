import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { get_errors } from "../error/errorSlice";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

//Check token and load user
export const loadUser = createAsyncThunk('auth/loadUser', (arg, { getState, rejectWithValue, dispatch }) => {

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

//Login a user
export const loginUser = createAsyncThunk('auth/loginUser', ({ email, password }, { getState, rejectWithValue, dispatch }) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //Request Body
    const body = JSON.stringify({ email, password });

    return axios.post('/api/auth', body, config)
        .then(response => response.data)
        .catch(error => {
            dispatch(get_errors({
                msg: error.response.data,
                status: error.response.status,
                id: 'LOGIN_FAIL'
            }));
            return rejectWithValue({
                data: error.response.data,
                status: error.response.status
            });
        })
})

//Register a new user
export const registerUser = createAsyncThunk('auth/registerUser', ({ name, email, password }, { rejectWithValue, dispatch }) => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //Request body
    const body = JSON.stringify({ name, email, password });

    return axios.post('/api/users', body, config)
        .then(response => response.data)
        .catch(error => {
            dispatch(get_errors({
                msg: error.response.data,
                status: error.response.status,
                id: 'REGISTER_FAIL'
            }));
            return rejectWithValue({
                data: error.response.data,
                status: error.response.status
            });
        })
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout_success: (state) => {
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
        builder.addCase(registerUser.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        builder.addCase(registerUser.rejected, (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        builder.addCase(loginUser.rejected, state => {
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
    const token = getState().auth.token;
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
export const { logout_success } = authSlice.actions;