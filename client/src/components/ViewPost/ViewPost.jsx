import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserPost } from '../../actions/posts';
import { authenticate } from '../../actions/auth';
import Skeleton from '@material-ui/lab/Skeleton';
import SkeletonSpecificPost from './SkeletonSpecificPost';
import { isValidImageURL } from '../../utility/index.js';

let options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const ViewPost = ({ isUserValid, setUserValid }) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const dispatch = useDispatch();
  const [curPost, setCurPost] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '#tags',
    selectedFile: {},
    likedBy: [],
    createdAt: '',
  });

  var scrollTop = function () {
    window.scrollTo(0, 0);
  };
  scrollTop();

  const handleLog = () => {
    navigate('/login');
  };

  useEffect(() => {
    (async () => {
      if (!isUserValid) {
        const x = await dispatch(authenticate());
        setUserValid(x);
      }

      const post = await getUserPost(id);
      setCurPost(post);
    })();
  }, [id, dispatch, setUserValid, isUserValid]);

  return (
    <div
      className="container-fluid bg-white"
      style={{ backgroundColor: '#f1f1f1' }}
    >
      <nav
        aria-label="breadcrumb"
        className="p-3 d-flex justify-content-between"
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {' '}
            <Link to="/" className="text-primary">
              Home
            </Link>{' '}
          </li>
          <li className="breadcrumb-item"> View Post </li>
        </ol>
        {isUserValid ? null : (
          <button onClick={handleLog} className="btn btn-primary">
            {' '}
            Login
          </button>
        )}
      </nav>

      {curPost.creator === '' ? (
        <SkeletonSpecificPost />
      ) : (
        <div>
          <div className="d-flex flex-column align-items-center">
            <h2 className="fs-1 fw-bolder fst-italic text-primary">
              {curPost.title}
            </h2>
            <p className="fw-light">
              {new Date(curPost.createdAt).toLocaleString('en-US', options)}
            </p>
          </div>
          <h4 className="text-end pe-3 fst-italic text-primary mb-3">
            {' '}
            - {curPost.creator}{' '}
          </h4>

          <div className="row">
            <div className="col-12 col-md-5 px-2">
              <div className="card border-0">
                {!isValidImageURL(curPost.selectedFile.url) ? (
                  <Skeleton variant="rect" height={300} />
                ) : (
                  <img
                    alt="Post"
                    src={curPost.selectedFile.url}
                    className="card-img-top"
                  />
                )}
              </div>
            </div>
            <div className="col-12 col-md-7 px-2">
              <div className="card border-0">
                <div className="card-body">
                  <p
                    className="card-text fs-5"
                    dangerouslySetInnerHTML={curPost.message}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column align-items-center p-5">
            <button
              type="button"
              className="btn btn-primary btn-lg position-relative"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBothOptions"
              aria-controls="offcanvasWithBothOptions"
            >
              Likes
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {curPost.likedBy.length}
                <span className="visually-hidden">Likes on Post</span>
              </span>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabIndex="-1"
            id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel"
          >
            <div className="offcanvas-header">
              <h5
                className="offcanvas-title fw-bolder fst-italic text-primary"
                id="offcanvasWithBothOptionsLabel"
              >
                Users who liked your Post
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="list-group list-group-flush">
                {curPost.likedBy.map((user) => (
                  <li
                    className="list-group-item list-group-item-action"
                    key={user}
                  >
                    {' '}
                    {user}{' '}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
