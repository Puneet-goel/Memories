import { UPDATE_CATEGORY, UPDATE_PHOTOS } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const updatePhotos = (category) => async (dispatch) => {
  return api
    .fetchCategoryPhotos(category)
    .then((res) => {
      const categoryImages = res.data.photos.map((photo) => {
        return {
          _id: photo.id,
          alt: photo.alt,
          src: photo.src.medium,
        };
      });

      dispatch({
        type: UPDATE_PHOTOS,
        payload: {
          category: category,
          photos: categoryImages,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateCategory = (category) => (dispatch) => {
  dispatch({
    type: UPDATE_CATEGORY,
    payload: category,
  });
};
