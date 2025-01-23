import { Header, Logo, UserProfile, Main, NewsFeed } from '../../components';
import './NewsPage.css';

const NewsPage = (): JSX.Element => {
  return (
    <>
      <Header>
        <Logo />
        <UserProfile />
      </Header>

      <Main>
        <NewsFeed />
      </Main>
    </>

  );
}

export default NewsPage;