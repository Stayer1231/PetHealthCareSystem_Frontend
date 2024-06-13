import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedVet: {
        vetName: "",
        certificate: "",
        message: ""
    },
    selectedPets: [],
    selectedDate: ""
};

const bookingFormSlice = createSlice({
    name: "bookingForm",
    initialState,
    reducers: {
        setSelectedVet: (state, action) => {
            state.selectedVet = {
                vetName: action.payload.vetName ?? "",
                certificate: action.payload.certificate ?? "",
                message: action.payload.message ?? ""
            }
        },

        setSelectedPets: (state, action) => {
            state.selectedPets = action.payload
        },

        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        }
    }
});

export const {
    setSelectedVet,
    setSelectedPets,
    setSelectedDate
} = bookingFormSlice.actions;

export default bookingFormSlice.reducer;