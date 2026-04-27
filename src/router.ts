import { createBrowserRouter } from 'react-router';
import Home from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ResetPasswordPage from './pages/reset-password';

const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/login', Component: LoginPage },
  { path: '/signup', Component: SignupPage },
  { path: '/reset-password', Component: ResetPasswordPage },
]);

export default router;
