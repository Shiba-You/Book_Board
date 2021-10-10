export const makeRnd = (N) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let rand_str = '';
  for ( var i = 0; i < N; i++ ) {
    rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return rand_str
}
export const timestampToTime = (timestamp) => {
  if (!timestamp) return
  const date = timestamp.toDate();
  const yyyy = `${date.getFullYear()}`;
  const MM = `0${date.getMonth() + 1}`.slice(-2);
  const dd = `0${date.getDate()}`.slice(-2);
  const HH = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);
  const ss = `0${date.getSeconds()}`.slice(-2);

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
}

export const toBase64Url = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const reader = new FileReader();
    // reader.onloadend = () => {
    //   callback(reader.result);
    // }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}