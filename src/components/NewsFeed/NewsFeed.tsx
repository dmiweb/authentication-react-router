import { Link } from 'react-router-dom';
import { useFetchWithLocalStorage, useGetToken } from '../../hooks';
import { TNews } from '../../models';
import { News } from '../../components';
import './NewsFeed.css';


const NewsFeed = (): JSX.Element => {
  const token: string | null = useGetToken();

  const [{ data: news, loading, error }] = useFetchWithLocalStorage(
    token ? import.meta.env.VITE_NEWS_URL : null,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return (
    <section className='news-feed-page'>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {news &&
        <ul className='news-feed'>
          {(news as TNews[]).map(item =>
            <li key={item.id} className='news-feed-item'>
              <Link className='news-feed-item-link' to={`/news/${item.id}`}>
                <News key={item.id} news={item} />
              </Link>
            </li>
          )}
        </ul>}
    </section>
  );
};

export default NewsFeed;