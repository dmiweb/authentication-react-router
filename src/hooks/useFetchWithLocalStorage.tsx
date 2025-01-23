import { useState, useEffect } from "react";
import { TUser, TNews } from '../models/index';

type FetchResult = {
  data?: TUser | TNews | TNews[] | null,
  loading: boolean,
  error: string | null,
};

const useFetchWithLocalStorage = (
  url: string | null,
  opts = {},
  localeStorageKey: string | null = null,
  trigger: number | string | undefined | null = 0
): [FetchResult] => {
  const [data, setData] = useState<TUser | TNews | TNews[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      return;
    };

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { ...opts, signal });

        if (!response.ok) {
          switch (response.status) {
            case 400:
              setError(response.status + ' - ' + 'Неправильный логин или пароль');
              break;
            case 401:
              setError(response.status + ' - ' + 'Сессия закрыта, обновите страницу');
              localStorage.removeItem('site_access_token');
              localStorage.removeItem('site_user_profile');
              break;
            case 404:
              setError(response.status + ' - ' + 'Ошибка сети');
              break;
            case 500:
              setError(response.status + ' - ' + 'Ошибка ответа сервера');
              break;
            default:
              setError('Неизвестная ошибка');
          }
        }

        const resData = response.status !== 401 && await response.json();

        if (resData && localeStorageKey) {
          localStorage.setItem(localeStorageKey, JSON.stringify(resData));
        }

        setData(resData);
      } catch (err) {
        if (!signal?.aborted) {
          setData(null);
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, trigger]);

  return [{ data, loading, error }];
};

export default useFetchWithLocalStorage;