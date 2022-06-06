import sanityClient from './index.js';
import { createReadStream } from 'fs';
import { basename } from 'path';
import { nanoid } from 'nanoid';

const functions = {};

functions.addPostImage = async (image, id) => {
  return sanityClient.assets
    .upload('image', createReadStream(image.path), {
      filename: basename(image.path),
    })
    .then((data) => {
      return sanityClient.create({
        _type: 'postmedia',
        photo: { asset: { _ref: data._id } },
        post_id: id,
      });
    });
};

functions.getSpecificPostImage = async (id) => {
  return sanityClient.fetch(
    `*[_type == "postmedia" && post_id == $id]{
        ...,
        photo{
          asset->{
            _id,
            url
          }
        }
    }`,
    { id },
  );
};
export default functions;
