export const stringToColor = () => {
  const string = localStorage.getItem('username');
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};

export const parseUsernameInitials = () => {
  const nameArray = localStorage.getItem('username').split('_');
  const initials =
    (nameArray.length ? nameArray[0][0] : '') +
    (nameArray.length > 1 ? nameArray[nameArray.length - 1][0] : '');
  return initials.toUpperCase();
};

export const parseUsername = () => {
  const nameArray = localStorage.getItem('username').split('_');
  const initial = nameArray.length
    ? nameArray[0][0].toUpperCase() + nameArray[0].slice(1)
    : '';
  return initial;
};

export const isValidImageURL = (url) => {
  if (url === '' || typeof url !== 'string') {
    return false;
  }

  return true;
};

export const findToken = () => {
  var token = decodeURIComponent(document.cookie);
  if (!token || token.length < 6) {
    return null;
  }

  token = token.substring(6);
  return token;
};
