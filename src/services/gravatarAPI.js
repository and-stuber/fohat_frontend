import MD5 from 'crypto-js/md5';

export function fetchAvatar(email) {
  const gravatarUrl = 'https://www.gravatar.com/avatar/';
  const emailMD5 = MD5(email);
  return (gravatarUrl + emailMD5);
}