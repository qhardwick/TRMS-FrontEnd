import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8125/users', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        error: null,
        user: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default userSlice.reducer;