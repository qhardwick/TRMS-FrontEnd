import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const submitNewForm = createAsyncThunk(
    'forms/newForm',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8125/forms', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Future implementation for when we delay updating the form object until upload success:
export const updateForm = createAsyncThunk(
    'forms/updateForm',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = axios.put(`http://localhost:8125/forms/${updatedData.id}`, updatedData);
            return (await response).data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const formSlice = createSlice({
    name: 'forms',
    initialState: {
        loading: false,
        error: null,
        form: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(submitNewForm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitNewForm.fulfilled, (state, action) => {
                state.loading = false;
                state.form = action.payload;
            })
            .addCase(submitNewForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateForm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateForm.fulfilled, (state, action) => {
                state.loading = false;
                state.form = action.payload;
            })
            .addCase(updateForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default formSlice.reducer;