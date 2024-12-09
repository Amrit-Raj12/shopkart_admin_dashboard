import { NavigateFunction } from 'react-router-dom';

const logoutHandler = (navigate: NavigateFunction) => {
  localStorage.removeItem('token');
  navigate('/auth/signin', { replace: true });
};

export default logoutHandler;
