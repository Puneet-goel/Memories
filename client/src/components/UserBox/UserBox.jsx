import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import "./style.css";

const UserBox = () => {
  const userDetails = useSelector(state => state.user);
  const [allUsers, setAllUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');

  return (
    <div>

    </div>
  );

}

export default UserBox;  