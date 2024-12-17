import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Create a new request Form action:
export const createForm = createAsyncThunk(
    'forms/createForm',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8125/forms', formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update basic Form data of an existing Form action:
export const updateForm = createAsyncThunk(
    'forms/updateForm',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8125/forms/${updatedData.id}`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update one of the attachment fields of an existing Form action:
export const updateAttachment = createAsyncThunk(
    'forms/updateAttachment',
    async ({ id, attachmentType, key }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8125/forms/${id}/attachments/url`,
                null, // nothing in request body
                {
                    params: {
                        attachmentType,
                        key
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Submit Form to approval chain:
// TODO: include requesting user's username in request header:
export const submitForm = createAsyncThunk(
    'forms/submitForm',
    async ({ id, username }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:8125/forms/${id}/submit`,
                null,
                { headers: {"username": username} }
            );
            return response.data;
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
            // Create new Form:
            .addCase(createForm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createForm.fulfilled, (state, action) => {
                state.loading = false;
                state.form = action.payload;
            })
            .addCase(createForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update existing Form:
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

            // Update attachment fields on existing Form:
            .addCase(updateAttachment.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAttachment.fulfilled, (state, action) => {
                state.loading = false;
                const { attachmentName, key } = action.payload;
                state.form = {...state.form, [attachmentName]: key};
            })
            .addCase(updateAttachment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Submit Form for approval:
            .addCase(submitForm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitForm.fulfilled, (state, action) => {
                state.loading = false;
                state.form = action.payload;
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Trigger loading state independent of other actions:
            .addCase('forms/setLoading', (state, action) => {
                state.loading = action.payload;
            })
    }
});

export default formSlice.reducer;