import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, followUser } from '../../actions/user.js';
import memoriesText from '../AuthenticationLoading/memoriesText.png';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import './styles.css';

const Profile = () => {
  const params = useParams();
  console.log(params.username);
  const profile = useSelector((state) => state.profile);
  const allUsers = useSelector((state) => state.users);
  const [searchUser, setSearchUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleFollowUser = (whomToFollow) => {
    dispatch(followUser(whomToFollow, profile));
  };

  const finalUsersToDispaly = allUsers.filter((user) => {
    const pattern = searchUser.toLowerCase().trim();
    if (pattern === '') return true;
    if (user.username.includes(pattern)) return true;
    if (user.email.includes(pattern)) return true;
    return false;
  });

  return (
    <div className="container-fluid p-0 bg-white vh-100">
      <NavBar searchText={searchUser} setSearchText={setSearchUser} />
      <div className="row m-0">
        <div className="col-1 col-sm-2 p-0" />
        <div className="col-10 col-sm-8 p-0">
          <div className="container-fluid overflow-auto p-0 users-container">
            <div className="row">
              {finalUsersToDispaly
                .filter((user) => user.username !== profile.username)
                .map((user) => (
                  <div
                    className="col-12 col-sm-6 pt-4 px-4"
                    key={user.username}
                  >
                    <div className="card text-center">
                      <img
                        src={user.photoURL || memoriesText}
                        className="card-img-top user-image"
                        alt="user-pic"
                      />
                      <div className="card-body d-flex flex-column">
                        <span
                          className="card-title fs-5 fw-bolder"
                          onClick={() => navigate(`/profile/${user._id}`)}
                        >
                          @{user.username}
                        </span>
                        <span className="fst-italic mb-2">{user.email}</span>
                        {(profile.following || []).includes(user.username) ? (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleFollowUser(user.username)}
                          >
                            UnFollow
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={() => handleFollowUser(user.username)}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-1 col-sm-2 p-0" />
      </div>
    </div>
  );
};

export default Profile;
