import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/config";


// Create a new request Form action:
export const createForm = createAsyncThunk(
    'forms/createForm',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/forms`, formData);
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Look up a form by its id:
export const getFormById = createAsyncThunk(
    'forms/getFormById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/forms/${id}`);
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch all Forms associated with a given user. Optionally, include a status param to filter and return a subset:
export const getUserForms = createAsyncThunk(
    'forms/getUserForms',
    async ({ currentUser, status }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/forms/active`,
                { 
                    params: {status},
                    headers: {"username": currentUser}
                }
            );
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update basic Form data of an existing Form action:
export const updateForm = createAsyncThunk(
    'forms/updateForm',
    async (updatedData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/forms/${updatedData.id}`, updatedData);
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Cancel reimbursement request. Deletes the form but only if it has not yet been awarded:
export const cancelForm = createAsyncThunk(
    'forms/cancelForm',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/forms/${id}`);
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// Submit Form to approval chain:
// TODO: include requesting user's username in request header:
export const submitForm = createAsyncThunk(
    'forms/submitForm',
    async ({ id, username }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/forms/${id}/submit`,
                null,
                { headers: { username } }
            );
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Supervisor approval:
export const supervisorApproval = createAsyncThunk(
    'forms/supervisorApproval',
    async ({ id, username }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/forms/${id}/supervisor-approve`,
                null,
                { headers: { username } }
            );
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error);
        }
    }
);

// Update one of the attachment fields of an existing Form action:
export const updateAttachment = createAsyncThunk(
    'forms/updateAttachment',
    async ({ id, attachmentType, key }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/forms/${id}/attachments/url`,
                null, // nothing in request body
                {
                    params: {
                        attachmentType,
                        key
                    }
                }
            );
            return response.data;
        } 
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Deny the reimbursement request:
export const denyRequest = createAsyncThunk(
    'forms/denyRequest',
    async ({ id, approver, reason }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/forms/${id}/deny`, { approver, reason });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const formSlice = createSlice({
    name: 'forms',
    initialState: {
        loading: false,
        error: null,
        form: null,
        userForms: [],
        status: null
    },
    reducers: {
        // Set the currently selected form for individual display and editing:
        setForm(state, action) {
            state.form = action.payload;
        },

        // Clear the current form so that we can create a new form:
        clearForm(state) {
            state.form = null;
        },

        // Set form Status value for filtering:
        setStatus(state, action) {
            state.status = action.payload;
        },

        // Manually set loading state during api calls not handled by redux:
        setLoading(state, action) {
            state.loading = action.payload;
        }
    },
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

            // View Form by id:
            .addCase(getFormById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFormById.fulfilled, (state,action) => {
                state.loading =false;
                state.form = action.payload;
            })
            .addCase(getFormById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Retrieve all Forms created by user:
            .addCase(getUserForms.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserForms.fulfilled, (state, action) => {
                state.loading = false;
                state.userForms = action.payload;
            })
            .addCase(getUserForms.rejected, (state, action) => {
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

            // Cancel a request form:
            .addCase(cancelForm.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelForm.fulfilled, state => {
                state.loading = false;
            })
            .addCase(cancelForm.rejected, (state, action) => {
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

            // Supervisor grant approval:
            .addCase(supervisorApproval.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(supervisorApproval.fulfilled, (state, action) => {
                state.loading = false;
                state.form = action.payload;
            })
            .addCase(supervisorApproval.rejected, (state, action) => {
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

            // Deny request and add reason to form:
            .addCase(denyRequest.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(denyRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.form = action.payload;
            })
            .addCase(denyRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { setForm, clearForm, setStatus, setLoading } = formSlice.actions;

export default formSlice.reducer;