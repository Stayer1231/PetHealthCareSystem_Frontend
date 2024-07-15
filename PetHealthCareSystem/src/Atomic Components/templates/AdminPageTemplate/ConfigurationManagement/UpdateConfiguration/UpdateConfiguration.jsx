import React, { useState } from "react";
import APIInUse from "../../../../../config/axios/AxiosInUse"; // Ensure this path is correct
import { Backdrop, CircularProgress } from "@mui/material";
import "./UpdateConfiguration.scss";

const UpdateConfiguration = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateConfiguration = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const requestData = {
        key,
        value,
      };

      console.log("Request Data:", requestData);

      const response = await APIInUse.put("Configuration/update", requestData);
      console.log("Response:", response);
      setMessage(response.data.message || "Configuration updated successfully");
    } catch (err) {
      console.error("Error updating configuration:", err);

      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        setError(`Error: ${err.response.status} - ${err.response.data.message || "Unauthorized"}`);
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <div className="flex flex-col justify-center items-center gap-2">
            <CircularProgress color="inherit" />
            <h1>Waiting</h1>
          </div>
        </Backdrop>
      )}

      <div className="update-configuration">
        <h1 className="update-configuration-title">Update Configuration</h1>
        {message && <p className="update-configuration-message">{message}</p>}
        {error && <p className="update-configuration-error">{error}</p>}
        <form className="update-configuration-form" onSubmit={handleUpdateConfiguration}>
          <div className="form-group">
            <label className="form-label" htmlFor="key">Key:</label>
            <input
              className="form-input"
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="value">Value:</label>
            <input
              className="form-input"
              type="text"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button className="form-button" type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateConfiguration;
