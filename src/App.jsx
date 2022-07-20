import styles from './App.module.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Login from './pages/authentication/Login';
import SignUp from './pages/authentication/SignUp';
import Header from './layout/Header';
import NopageFound from './pages/NopageFound';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './redux/auth-slice';
import { apiKey, auth, db } from './shared/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, where, query, collection } from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const username = useSelector((state) => state.auth.user.username);

  const isSession = sessionStorage.getItem(session_key) ? true : false;

  const loginCheck = async (user) => {
    if (user) {
      dispatch(authActions.login());

      const user_docs = await getDocs(
        query(collection(db, 'users'), where('user_id', '==', user.email))
      );

      let username;
      let user_id;
      let doc_id;

      user_docs.forEach((u) => {
        console.log(u.data(), 'user data'); // user 정보 가지고 옴. state에 넣어서 이름 얻을 수 있다.
        username = u.data().name;
        user_id = u.data().user_id;
        doc_id = u.id;
      });

      dispatch(authActions.setUser({ username, user_id, doc_id })); // user 정보 redux에 설정
      // dispatch(authActions.setUser({}));
    } else {
      dispatch(authActions.logOut());
    }
  };

  useEffect(() => {
    if (isSession) {
      onAuthStateChanged(auth, loginCheck);
    }
  }, []);

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
