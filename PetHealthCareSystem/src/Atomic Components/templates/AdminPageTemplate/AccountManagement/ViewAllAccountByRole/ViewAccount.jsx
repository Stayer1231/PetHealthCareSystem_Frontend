import React, { useEffect, useState } from 'react';
import AuthAPI from '../../../../../config/axios/AxiosAuth'; // Adjust the path if needed
import Cookies from 'js-cookie';
import './ViewAccount.scss';

const ViewAccount = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        console.log('Access Token:', accessToken); // Log the access token

        if (!accessToken) {
          setError('No access token found. Please log in again.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        console.log('Config for request:', config); // Log the request config

        const response = await AuthAPI.get('admin/roles/all', config);
        console.log('Response:', response); // Log the response

        setRoles(response.data.data);
      } catch (err) {
        console.error('Error fetching roles:', err);
        if (err.response) {
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
          console.error('Error response headers:', err.response.headers);
          setError(`Error: ${err.response.status} - ${err.response.data.message || 'Unauthorized'}`);
        } else {
          setError(err.message || 'Something went wrong');
        }
      }
    };

    fetchRoles();
  }, []);

  return (
    <div className="view-account">
      {error ? (
        <p className="view-account-error">Error: {error}</p>
      ) : (
        <ul className="view-account-list">
          {roles.map((role) => (
            <li className="view-account-list-item" key={role.id}>
              <strong className="view-account-role-name">{role.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAccount;
