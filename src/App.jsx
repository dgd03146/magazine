import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/authentication/Login';
import SignUp from './pages/authentication/SignUp';
import Header from './layout/Header';
import NopageFound from './pages/NopageFound';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<NopageFound />} />
      </Routes>
    </div>
  );
}

export default App;
