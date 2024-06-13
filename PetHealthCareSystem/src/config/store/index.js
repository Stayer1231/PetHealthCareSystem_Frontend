import { configureStore } from "@reduxjs/toolkit";
import bookingFormReducer from "./BookingForm/bookingForm";

const store = configureStore({
    reducer: {
        bookingForm: bookingFormReducer
    },
});

export default store;