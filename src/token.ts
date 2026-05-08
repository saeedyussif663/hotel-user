import Cookies from 'js-cookie';

function set(name: string, value: string, expiry?: Date) {
  const expires = expiry ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  Cookies.set(name, value, {
    expires,
    secure: true,
    path: '/',
    sameSite: 'Lax',
  });
}

function get(name: string) {
  return Cookies.get(name);
}

function remove(name: string) {
  Cookies.remove(name, { secure: true, path: '/', sameSite: 'Lax' });
}

export default { set, get, remove };
