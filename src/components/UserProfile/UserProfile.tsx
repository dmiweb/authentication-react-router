import { useState, useEffect, useContext } from 'react';
import { useFetchWithLocalStorage, useGetToken, useGetUser } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';
import { TUser } from '../../models';
import { Button } from "../../components";
import './UserProfile.css';

const UserProfile = (): JSX.Element => {
  const [user, setUser] = useState<TUser | null>(null);
  const { handleAuth } = useContext(AuthContext);
  const localStorageKey = 'site_user_profile';
  const token: string | null = useGetToken();
  const saveUser: TUser | null = useGetUser();

  const [{ data: fetchUser, loading, error }] = useFetchWithLocalStorage(
    token && !saveUser ? import.meta.env.VITE_USER_URL : null,
    { headers: { Authorization: `Bearer ${token}` } },
    localStorageKey
  );

  useEffect(() => {
    if (token && saveUser) {
      setUser(saveUser);
    } else {
      if (fetchUser) setUser(fetchUser as TUser);
    }
  }, [token, saveUser, fetchUser])

  const handlerLogout = () => {
    handleAuth();
    localStorage.removeItem('site_access_token');
    localStorage.removeItem('site_user_profile');
  }

  return (
    <>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {user &&
        <div id={user.id} className="user-profile">
          <span className="user-profile-name">Hello, {user.name}</span>
          <div className='user-profile-wrap-avatar'>
            <img src={user.avatar} className="user-profile-avatar" alt='user avatar' />
          </div>
          <Button type='button' className='profile-logout-btn' name='Logout' handler={handlerLogout} />
        </div>}
    </>
  );
}

export default UserProfile;