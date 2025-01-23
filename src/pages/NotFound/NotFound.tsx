import { useNavigate } from "react-router-dom";
import { Header, Logo, UserProfile, Main } from '../../components';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClickBtn = () => {
    if (document.referrer) {
      window.history.back();
    }
    else {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <Header>
        <Logo />
        <UserProfile />
      </Header>

      <Main>
        <div className="not-found">
          <h1>404</h1>
          <p>Page Not Found</p>
          <button className="not-found__btn" onClick={handleClickBtn}>
            Вернуться назад
          </button>
        </div>
      </Main>
    </>

  );
};

export default NotFound;