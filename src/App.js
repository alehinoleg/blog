import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import { Layout } from './components/Layout';
import ListArticles from './pages/ListArticles';
import { loadArticles } from './store/articles/articlesActions';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadArticles())
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
