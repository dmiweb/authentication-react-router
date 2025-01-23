import { useParams, Navigate } from 'react-router-dom';
import { useFetchWithLocalStorage, useGetToken } from '../../hooks';
import { TNews } from '../../models';
import { Header, Logo, UserProfile, Main, News } from '../../components';
import './NewsItemPage.css';

const NewsItemPage = (): JSX.Element => {
  const token = useGetToken();
  const params = useParams();

  const url = `${import.meta.env.VITE_NEWS_URL}/${params.id}`;

  const [{ data: news, loading, error }] = useFetchWithLocalStorage(
    token ? url : null,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const notFoundNewsItem = (news && typeof news === 'object' && 'message' in news) ?
    (news as { message: string }).message :
    null;

  return (
    <>
      <Header>
        <Logo />
        <UserProfile />
      </Header>

      <Main>
        {loading && <div className='loading'>Loading...</div>}
        {notFoundNewsItem === 'not found' && <Navigate to="/not-found" replace />}
        {error && <div className='error-message'>{error}</div>}
        {news && <News news={news as TNews} />}
      </Main>
    </>

  )
}

export default NewsItemPage;