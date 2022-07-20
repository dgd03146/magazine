import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/auth-slice';
import { signOut } from 'firebase/auth';
import { auth } from '../shared/firebase';

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.user.username);

  const gotoLogin = () => {
    navigate('/login');
  };

  const gotoSignUp = () => {
    navigate('/signUp');
  };

  const logoutHandler = () => {
    signOut(auth);
    dispatch(authActions.logOut());
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftBox}>
        <h1>
          ⚽Football<span>Magazine</span>
        </h1>
      </div>
      <div className={styles.rightBox}>
        {!isLoggedIn && (
          <>
            <button onClick={gotoLogin}>로그인</button>
            <button onClick={gotoSignUp}>회원가입</button>
          </>
        )}
        {isLoggedIn && (
          <>
            <h1>{username}</h1>
            <button>알림</button>
            <button className={styles.logout} onClick={logoutHandler}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
