import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { parseUsernameInitials } from '../../utility/index.js';
import PostEditor from './PostEditor.jsx';
import './styles.css';

const CreatePost = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null,
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (post) {
      setPostData(post);
      setModal(true);
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (postData.title === '') {
      setError('Title cannot be empty');
      return;
    } else if (postData.message === '') {
      setError('Message cannot be empty');
      return;
    }

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    handleModal();
  };

  const handleModal = () => {
    setModal((prev) => !prev);
    clear();
  };

  const handleTagData = (e) => {
    let arr = e.target.value.split(/[ ,]/);
    arr = arr.filter((ele) => ele !== '');
    setPostData({ ...postData, tags: arr });
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
    setPostData({ ...postData, selectedFile: e.target.files[0] });
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    setFile(null);
  };

  return (
    <div className="create-post d-flex justify-content-between p-3 my-2">
      <Avatar className={classes.avatar}>{parseUsernameInitials()}</Avatar>
      <div
        className="create-post-button d-flex justify-content-center align-items-center p-1"
        onClick={handleModal}
      >
        Want to share a Snap?
      </div>
      <Modal
        open={modal}
        className={classes.modal}
        onClose={handleModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="form-container p-3 p-md-5">
          <h5 className="form-header text-center fw-bolder">
            {' '}
            {currentId ? 'Edit' : 'Add A'} SNAP{' '}
          </h5>
          <button
            className="form-header-close btn m-1 m-md-3"
            type="button"
            onClick={handleModal}
          >
            <CloseIcon fontSize="small" />
          </button>

          <div className="input-group input-group-lg my-3">
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="Title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </div>

          <PostEditor postData={postData.message} setPostData={setPostData} />

          <div className="input-group input-group-lg my-3">
            <span className="input-group-text" id="inputGroup-sizing-lg">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="comma separated tags"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              value={postData.tags}
              onChange={handleTagData}
            />
          </div>

          <input
            style={{ width: '100%' }}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {file && (
            <div className="post-photo-container">
              <img
                className="user-photo"
                src={file ? URL.createObjectURL(file) : null}
                alt="snap uploaded by user"
              />
            </div>
          )}

          <div className="form-actions d-flex justify-content-end pt-3">
            <span className="text-danger me-3 d-flex align-items-center">
              {error}
            </span>
            <button
              className="btn me-2 btn-outline-warning"
              type="button"
              onClick={handleModal}
            >
              Clear & Close
            </button>
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleSubmit}
            >
              {currentId ? 'Save' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
