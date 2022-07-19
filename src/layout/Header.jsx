import React from 'react';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();
  const gotoLogin = () => {
    navigate('/login');
  };

  const gotoSignUp = () => {
    navigate('/signUp');
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftBox}>
        <h1>
          ⚽Football<span>Magazine</span>
        </h1>
      </div>
      <div className={styles.rightBox}>
        <button onClick={gotoLogin}>로그인</button>
        <button onClick={gotoSignUp}>회원가입</button>
      </div>
    </header>
  );
};

export default Header;
