import { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useFetchWithLocalStorage, useGetToken } from '../../hooks';
import { AuthContext } from '../../context/AuthContext';
import { TAuthForm } from '../../models';
import { Header, Logo, AuthorizationForm, Main } from '../../components';
import './HomePage.css';

const HomePage = (): JSX.Element => {
  const [authData, setAuthData] = useState<TAuthForm | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);

  const [{ loading, error }] = useFetchWithLocalStorage(
    authData ? import.meta.env.VITE_AUTH_URL : null,
    { method: 'POST', body: JSON.stringify(authData) },
    'site_access_token',
    fetchTrigger
  );

  const token = useGetToken(loading);

  useEffect(() => {
    if (token) {
      handleAuth();
      navigate('news', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getDataForm = useCallback(async (form: TAuthForm | null): Promise<void> => {
    setAuthData(form)
    setFetchTrigger((prev) => prev + 1);
  }, []);

  return (
    <>
      <Header>
        <Logo />
        <AuthorizationForm getDataForm={getDataForm} />
        {error && <div className='error-message'>{error}</div>}
      </Header>

      <Main>
        <div className='guest-page'>
          <h1 className='guest-page-title'>Neto Social</h1>
          <p className='guest-page-description'>Facebook and VK killer.</p>
        </div>
      </Main>
    </>

  )
}

export default HomePage;