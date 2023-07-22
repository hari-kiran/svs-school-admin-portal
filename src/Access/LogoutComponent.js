import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId === null && !redirected) {
      // Only set redirected to true and redirect if the current URL is not already the target URL
      const targetURLs = [
        '/svsportaladmin/LoginAdmin',
        '/svsportaladmin/'
      ];
  
      const currentURL = window.location.pathname;
  
      if (!targetURLs.includes(currentURL)) {
        setRedirected(true);
        // Redirect to the home page if user_id is null and not on the target URLs
        window.location.href = targetURLs[0]; // Choose the first target URL for redirection
      }
    }
  }, [redirected]);
  

  return (
    <div>
      {/* Your content goes here */}
    </div>
  );
};

export default LogoutComponent;
