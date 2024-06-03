import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import  LoginPage  from "../../pages/LoginPage";
import  HomePage  from "../../pages/HomePage";

const AppRouting = () => {
    return (
        <Routes>
            <Route path="" element={<Navigate to="homepage" />} />

            <Route path="login" element={<LoginPage />} />
            <Route path="homepage" element={<HomePage />} />
            
            <Route path="*" element={<Navigate to="homepage" />} />
        </Routes>
    );
};

export default AppRouting;