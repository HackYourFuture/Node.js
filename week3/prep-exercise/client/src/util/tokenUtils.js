const TOKEN_NAME = 'token';

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function putToken(token) {
  localStorage.setItem(TOKEN_NAME, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_NAME);
}
