import React, { useEffect, useState } from 'react';
import './ViewConfiguration.scss';
import APIInUse from '../../../../../config/axios/AxiosInUse';
import { Backdrop, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';

const ViewConfiguration = () => {
  const [configurations, setConfigurations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchConfigurations = async () => {
      setIsLoading(true);

      try {
        const response = await APIInUse.get('Configuration/all');
        const configList = response?.data?.data;

        console.log(configList);

        setConfigurations(configList);
      } catch (error) {
        console.error("Error fetching configurations:", error);
        setError(error.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfigurations();
  }, []);

  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <CircularProgress color="inherit" />
            <h1>Waiting</h1>
          </div>
        </Backdrop>
      )}

      <div className="view-configuration">
        {error ? (
          <p className="view-configuration-error">Error: {error}</p>
        ) : (
          <ul className="view-configuration-list">
            {configurations.map((config) => (
              <li className="view-configuration-list-item" key={config.key}>
                <strong className="view-configuration-display-string">{config.displayString}:</strong>
                <span className="view-configuration-value">{config.value || 'N/A'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ViewConfiguration;
