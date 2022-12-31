import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import { Layout } from './components/Layout';
import ListArticles from './pages/ListArticles';
import { fetchArticles } from './store/articlesSlice';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<ListArticles/>}/>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
      </Route>
    </Routes>
  );
}

export default App;
