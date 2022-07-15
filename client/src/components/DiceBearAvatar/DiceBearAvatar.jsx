import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-avataaars-sprites';
import { useMemo } from 'react';

const DiceBearAvatar = ({ username }) => {
  const avatar = useMemo(() => {
    return createAvatar(style, {
      dataUri: true,
      seed: username,
    });
  }, [username]);

  return (
    <img src={avatar} className="card-img-top user-image" alt="user profile" />
  );
};

export default DiceBearAvatar;
