import React from 'react';
import styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/auth-slice';
import { signOut } from 'firebase/auth';
import { auth } from '../shared/firebase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.user.user_id);

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
        <Link to="./main">
          <h1>
            ⚽Football<span>Magazine</span>
          </h1>
        </Link>
      </div>
      <div className={styles.rightBox}>
        {!isLoggedIn && (
          <>
            <button onClick={gotoLogin}>로그인</button>
            <button onClick={gotoSignUp}>회원가입</button>
          </>
        )}
        {isLoggedIn && (
          <div className={styles.isLoggedInBox}>
            <h1 className={styles.userId}>{userId}</h1>
            <button>
              <AccountBoxIcon
                onClick={() => {
                  navigate('/myPage');
                }}
              />
            </button>
            <button>
              <NotificationsIcon />
            </button>
            <button className={styles.logout} onClick={logoutHandler}>
              <LogoutIcon />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
