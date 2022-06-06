import React from 'react';

const UserBox = () => {
  const users = ['ddfdf', 'fsfsdf', 'dsfdsf', 'sdfds', 'sdfdfsd'];
  return (
    <div className="user-container">
      <div className="user-list">
        <ul>
          {users.map((user) => {
            return <li key={user}> {user} </li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserBox;
