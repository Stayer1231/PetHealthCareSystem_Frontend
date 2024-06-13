import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedVet: {
        id: -1,
        userName: "",
        email: "",
        fullName: "",
        address: "",
        avatar: "",
        role: "",
        birthDate: ""
    },
    selectedPets: [],
    selectedDate: "",
    vets: []
};

const bookingFormSlice = createSlice({
    name: "bookingForm",
    initialState,
    reducers: {
        setSelectedVet: (state, action) => {
            state.selectedVet = {
                id: action.payload.id,
                userName: action.payload.userName,
                email: action.payload.email,
                fullName: action.payload.fullName,
                address: action.payload.address,
                avatar: action.payload.avatar,
                role: action.payload.role,
                birthDate: action.payload.birthDate
            }
        },

        setSelectedPets: (state, action) => {
            state.selectedPets = action.payload
        },

        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },

        setVets: (state, action) => {
            state.vets = action.payload
        }
    }
});

export const {
    setSelectedVet,
    setSelectedPets,
    setSelectedDate,
    setVets
} = bookingFormSlice.actions;

export default bookingFormSlice.reducer;