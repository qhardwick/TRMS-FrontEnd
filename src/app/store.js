import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import formReducer from "../features/forms/formSlice";

const store = configureStore({
    reducer: {
        users: userReducer,
        forms: formReducer
    },
});

export default store;