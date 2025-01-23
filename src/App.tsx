import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './hocs/ProtectedRoute';
import { Layout } from './components';
import { HomePage, NewsPage, NewsItemPage, NotFound } from './pages';
import './App.css';

function App() {
  const routes = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="news" element={
          <ProtectedRoute>
            <NewsPage />
          </ProtectedRoute>
        } />
        <Route path="news/:id" element={
          <ProtectedRoute>
            <NewsItemPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        } />
      </Route>
    )
  );

  return (
    <RouterProvider router={routes} />
  );
}

export default App;
