import React from 'react';
import { fileToBlobtoFile } from '../../utility/index.js';
import '../Profile/styles.css';

const CategoryPhotos = ({ photos, setFile, setModal }) => {
  const handleImageClick = async (url, name) => {
    const file = await fileToBlobtoFile(url, name);
    setFile(file);
    setModal(true);
  };

  return (
    <div className="row">
      {photos.length > 0 &&
        photos.map((photo) => (
          <div
            className="col-md-6"
            key={photo._id}
            type="button"
            onClick={() => handleImageClick(photo.src, photo.alt)}
          >
            <div
              className="card m-1 justify-content-center card-hover"
              style={{ minHeight: '150px' }}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="middle">Click photo to add it to your memory</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategoryPhotos;
