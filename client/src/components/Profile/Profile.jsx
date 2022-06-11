import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { followUser } from '../../actions/user.js';
import { useParams } from 'react-router-dom';
import { options } from '../../utility/index.js';
import './styles.css';

const Profile = () => {
  const params = useParams();
  const username = params.username;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);
  const allUsers = useSelector((state) => state.users);
  const posts = useSelector((state) =>
    state.posts.filter((post) => post.creator === username),
  );

  const userDetails = allUsers.filter((user) => user.username === username)[0];
  const followers = allUsers.reduce((total, user) => {
    if (user.username !== username && user.following.includes(username)) {
      return total + 1;
    }
    return total;
  }, 0);
  const followingThisUser = (profile.following || []).includes(username);

  const handleEditAndFollow = () => {
    if (username === profile.username) {
      return; //enable edit
    }
    dispatch(followUser(username, profile));
  };

  if (!userDetails) {
    return (
      <div className="container-fluid p-0 bg-white vh-100">
        <NavBar disableSearch={true} />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 bg-white vh-100">
      <NavBar disableSearch={true} />
      <div className="profile-container">
        <div className="row justify-content-center py-4 w-100 m-0">
          <div
            className="card col-10 col-6-sm p-0"
            style={{ maxWidth: '540px' }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <img
                  src={userDetails.profileImage.url}
                  className="img-fluid rounded-start"
                  alt="user profile"
                />
              </div>
              <div className="col-md-8 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bolder">
                    @{userDetails.username}
                  </h5>
                  <p className="card-text">Followers: {followers}</p>
                  <p className="card-text">
                    Following: {userDetails.following.length}
                  </p>
                  <p className="card-text">Email: {userDetails.email}</p>
                  <p className="card-text">
                    Joined Us:{' '}
                    {new Date(userDetails.joinedAt).toLocaleString(
                      'en-US',
                      options,
                    )}
                  </p>
                  <button
                    className={`btn btn-${
                      username === profile.username
                        ? 'primary'
                        : followingThisUser
                        ? 'danger'
                        : 'success'
                    }`}
                    onClick={handleEditAndFollow}
                  >
                    {username === profile.username
                      ? 'Edit Profile'
                      : followingThisUser
                      ? 'UnFollow'
                      : 'Follow'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center w-100 p-3 m-0">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => (
              <div className="col-12 col-sm-6 col-md-4 m-2" key={post._id}>
                <div className="card h-100 card-hover">
                  <img
                    src={post.selectedFile.url}
                    className="card-img-top h-100"
                    alt={post.title}
                  />
                  <div className="middle">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/post/${post._id}`)}
                    >
                      View Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
