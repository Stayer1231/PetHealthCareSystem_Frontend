import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayedServiceData: [],
    allService:[]
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setDisplayedServiceData: (state, action) => {
            state.displayedServiceData = action.payload
        },

        setAllService: (state, action) => {
            state.allService = action.payload
        }
    }
});

export const {
    setAllService,
    setDisplayedServiceData
} = homePageSlice.actions;

export default homePageSlice.reducer;