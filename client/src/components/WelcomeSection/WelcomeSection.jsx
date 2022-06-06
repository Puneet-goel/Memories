import React from 'react';
import { parseUsername } from '../../utility/index.js';
import './welcomeSection.css';
import UserBox from '../UserBox/UserBox.jsx';

const WelcomeSection = () => {
  return (
    <div className="left-section d-flex flex-column p-3">
      <div className="hello-user">
        <h3 className="fw-bolder">Hi {parseUsername()},</h3>
      </div>
      <div className="follow-user">
        <UserBox />
      </div>
    </div>
  );
};

export default WelcomeSection;
