import { configureStore } from "@reduxjs/toolkit";
import bookingFormReducer from "./BookingForm/bookingForm";
import homePageReducer from "./HomePage/homePage";
import staffRoleReducer from "./StaffRole/staffRole";

const store = configureStore({
    reducer: {
        bookingForm: bookingFormReducer,
        homePage: homePageReducer,
        staffRole: staffRoleReducer
    },
});

export default store;