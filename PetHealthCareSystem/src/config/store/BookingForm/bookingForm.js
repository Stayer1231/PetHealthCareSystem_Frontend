import { createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

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
    vets: [],
    selectedServices: [],
    bookingNote: "",
    inputExceptions: [],
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

        reInitialSelectedVet: (state) => {
            state.selectedVet = initialState.selectedVet
        },

        clearSelectedVet: (state) => {
            state.selectedVet = initialState.selectedVet
        },

        setSelectedPets: (state, action) => {
            state.selectedPets = action.payload
        },

        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },

        setVets: (state, action) => {
            state.vets = action.payload
        },

        setSelectedServices: (state, action) => {
            state.selectedServices = action.payload
        },
        setBookingNote: (state, action) => {
            state.bookingNote = action.payload
        },

        setInputExceptions: (state, action) => {
            state.inputExceptions = action.payload
        }
    }
});

export const {
    setSelectedVet,
    setSelectedPets,
    setSelectedDate,
    setVets,
    setSelectedServices,
    clearSelectedVet,
    setBookingNote,
    setInputExceptions,
    reInitialSelectedVet
} = bookingFormSlice.actions;

export default bookingFormSlice.reducer;