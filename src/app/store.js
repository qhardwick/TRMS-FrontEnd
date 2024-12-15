import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/users/userSlice";
import formReducer from "../features/forms/formSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: userReducer,
        forms: formReducer
    },
});

export default store;