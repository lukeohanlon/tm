import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await axios.get('https://medminer.site/api/v1/accounts/show', {
        // You might need to send authentication tokens or cookies depending on your setup
        // headers: { Authorization: 'Bearer ' + token }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  return (
    <div>
      <h2>Account</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          {/* Display other user information */}
        </div>
      )}
      <Link to="/account/edit">Edit Account</Link>
      <button>Change Password</button>
      <button>Delete Account</button>
    </div>
  );
};

export default Account;
