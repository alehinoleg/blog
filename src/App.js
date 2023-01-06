import { Routes, Route } from 'react-router-dom';



import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import ArticleFull from './pages/articleFull';
import { Layout } from './components/Layout';
import ListArticles from './pages/ListArticles';



function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<ListArticles/>}/>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='/articles/:slug' element={<ArticleFull />}/>
      </Route>
    </Routes>
  );
}

export default App;
