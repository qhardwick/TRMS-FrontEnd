import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => { state.value++ },
        decrement: state => { state.value-- },
        incrementByValue: (state, action) => { state.value = state.value + action.payload }
    }
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;

export default counterSlice.reducer;