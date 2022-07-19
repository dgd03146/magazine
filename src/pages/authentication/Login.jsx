import React, { useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header';

const Login = () => {
  let navigate = useNavigate();

  const id_ref = useRef(null);
  const pw_ref = useRef(null);

  const onLogin = () => {};

  return (
    <div className={styles.loginPage}>
      <div className={styles.login}>
        <h1 className={styles.title}>
          ⚽Football<span>Magazine</span>
        </h1>
        <div className={styles.loginWrapper}>
          <div className={styles.inputBox}>
            <input type="email" placeholder="아이디(이메일)" />
            <input type="password" placeholder="비밀번호" />
          </div>
          <button className={styles.loginBtn} onClick={onLogin}>
            로그인
          </button>
          <button
            className={styles.signUpBtn}
            onClick={() => {
              navigate('/signUp');
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
