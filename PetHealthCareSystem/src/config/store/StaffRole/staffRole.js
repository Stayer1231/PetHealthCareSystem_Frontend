import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointmentList: [],
    pageNo: 1,
    pageSize: 10,
    totalPage: 1,
    hasPreviousPage: false,
    hasNextPage: false
};

const staffRoleSlice = createSlice({
    name: "staffRole",
    initialState,
    reducers: {
        setAppointmentList: (state, action) => {
            state.appointmentList = action.payload
        },
        setPageNo: (state, action) => {
            state.pageNo = action.payload
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload
        },
        setHasPreviousPage: (state, action) => {
            state.hasPreviousPage = action.payload
        },
        setHasNextPage: (state, action) => {
            state.hasNextPage = action.payload
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload
        }
    }
});

export const {
    setAppointmentList,
    setPageNo,
    setPageSize,
    setHasPreviousPage,
    setHasNextPage,
    setTotalPage
} = staffRoleSlice.actions;

export default staffRoleSlice.reducer;