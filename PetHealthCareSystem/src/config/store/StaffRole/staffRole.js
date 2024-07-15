import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    appointmentList: [],
    pageNo: 1,
    pageSize: 10,
    totalPage: 1,
    hasPreviousPage: false,
    hasNextPage: false,
    customerId: 0,
    services: [],
    vets: [],
    timeTables: [],
    selectedDate: "",
    selectedTimeFrameId: 0,
    inputExceptions: [],
    selectedServices: [],
    selectedPets: [],
    selectedVetId: 0,
    bookingNote: "",
    selectedCustomer: null,
    phoneNumberInPut: "",
    customerList: [],
    petList: [],
    showModal: false,
    transactionList: [],
    serviceId:0,
    serviceName:"",
    servicedescription:"",
    servicePice:0,
    showEditModal: false,
    modelType:""
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
        },
        setCustomerId: (state, action) => {
            state.customerId = action.payload
        },
        setServices: (state, action) => {
            state.services = action.payload
        },
        setVets: (state, action) => {
            state.vets = action.payload
        },
        setTimeTables: (state, action) => {
            state.timeTables = action.payload
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },
        setSelectedTimeFrameId: (state, action) => {
            state.selectedTimeFrameId = action.payload
        },
        setInputExceptions: (state, action) => {
            state.inputExceptions = action.payload
        },
        setSelectedServices: (state, action) => {
            state.selectedServices = action.payload
        },
        setSelectedPets: (state, action) => {
            state.selectedPets = action.payload
        },
        setSelectedVetId: (state, action) => {
            state.selectedVetId = action.payload
        },
        setBookingNote: (state, action) => {
            state.bookingNote = action.payload
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload
        },
        setPhoneNumberInPut: (state, action) => {
            state.phoneNumberInPut = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setPetList: (state, action) => {
            state.petList = action.payload
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload
        },
        setTransactionList: (state, action) => {
            state.transactionList = action.payload
        },
        setServiceId: (state, action) => {
            state.serviceId = action.payload
        },
        setServiceName: (state, action) => {
            state.serviceName = action.payload
        },
        setServicedescription: (state, action) => {
            state.servicedescription = action.payload
        },
        setServicePice: (state, action) => {
            state.servicePice = action.payload
        },
        setShowEditModal: (state, action) => {
            state.showEditModal = action.payload
        },
        setModalType: (state, action) => {
            state.modelType = action.payload
        }
    }
});

export const {
    setAppointmentList,
    setPageNo,
    setPageSize,
    setHasPreviousPage,
    setHasNextPage,
    setTotalPage,
    setCustomerId,
    setServices,
    setVets,
    setTimeTables,
    setSelectedDate,
    setSelectedTimeFrameId,
    setInputExceptions,
    setSelectedServices,
    setSelectedPets,
    setSelectedVetId,
    setBookingNote,
    setSelectedCustomer,
    setPhoneNumberInPut,
    setCustomerList,
    setPetList,
    setShowModal,
    setTransactionList,
    setServiceId,
    setServiceName,
    setServicedescription,
    setServicePice,
    setShowEditModal,
    setModalType
} = staffRoleSlice.actions;

export default staffRoleSlice.reducer;