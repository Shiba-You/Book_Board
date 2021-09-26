export const makeRnd = (N) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let rand_str = '';
  for ( var i = 0; i < N; i++ ) {
    rand_str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return rand_str
}