import React, { useRef } from 'react';
import styles from './SignUp.module.css';
import { auth } from '../../shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../shared/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../layout/Header';

const SignUp = () => {
  let navigate = useNavigate();
  const id_ref = useRef(null);
  const name_ref = useRef(null);
  const pw_ref = useRef(null);

  const onSignUp = async () => {
    navigate('/login');
  };

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUp}>
        <h1 className={styles.title}>
          ⚽Football<span>Magazine</span>
        </h1>
        <div className={styles.signUpWrapper}>
          <div className={styles.inputBox}>
            <input type="email" placeholder="아이디(이메일)" ref={id_ref} />
            <input type="text" placeholder="이름" ref={name_ref} />
            <input type="password" placeholder="비밀번호" ref={pw_ref} />
          </div>
          <button className={styles.signUpBtn} onClick={onSignUp}>
            회원가입
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => {
              navigate('/login');
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
