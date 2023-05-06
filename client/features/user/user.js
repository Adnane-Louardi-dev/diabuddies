import {createSlice} from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        value: null,
    },
    reducers: {
        updateUser: (state, action) => {
            state.value = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { updateUser } = user.actions;

export default user.reducer;
